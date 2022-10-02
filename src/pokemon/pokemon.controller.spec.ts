import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { fileToBuffer } from '../common/functions/read-file.function';
import { TypeOrmExModule } from '../common/modules/typeorm_ex.module';
import { PokemonRepository } from './repositories/pokemon.repository';
import {
  getRepositoryToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { PokemonEntity } from './entities/pokemon.entity';
import { validateEnv } from '../config/common/env.validation';
import { AppConfigModule } from '../config/app-config.module';
import { AppConfigService } from '../config/app-config.service';
import { ExcelDto } from './dtos/excel.dto';
import { testUploadExcelResponse } from '../common/test/responses/test-upload-excel.response';
import { testSearchPokemonsResponse } from '../common/test/responses/test-search-pokemons-response';
import { SearchPokemonsQueryDto } from './dtos/search-pokemons-query.dto';

describe('PokemonController', () => {
  let pokemonController: PokemonController;
  let repository: Repository<PokemonEntity>;

  beforeAll(async () => {
    const env = process.env.ENV ?? 'test';

    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validate: validateEnv,
          envFilePath: __dirname + `/../../.env.${env}`,
          expandVariables: true,
          ignoreEnvFile: false,
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [AppConfigModule],
          inject: [AppConfigService],
          useFactory: (configService: AppConfigService): TypeOrmModuleOptions =>
            configService.getDBConfig(),
          dataSourceFactory: async (options) =>
            await new DataSource(options).initialize(),
        }),
        TypeOrmModule.forFeature([PokemonEntity]),
        TypeOrmExModule.forCustomRepository(PokemonRepository),
      ],
      controllers: [PokemonController],
      providers: [PokemonService],
    }).compile();

    pokemonController = app.get<PokemonController>(PokemonController);
    repository = app.get(getRepositoryToken(PokemonEntity));

    await repository.query('truncate pokemon_entity');
  });

  describe('[POST] pokemon/upload/excel', () => {
    it('should return response with count of saved data and count of errors', async () => {
      const fileBuffer = (await fileToBuffer(
        __dirname + '/../../Pokemon Go.xlsx',
      )) as Buffer;

      const mimetypeMock =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      const request = new ExcelDto();

      request.buffer = fileBuffer;
      request.mimetype = mimetypeMock;

      expect(
        await pokemonController.uploadPokemonsExcel(request),
      ).toStrictEqual(testUploadExcelResponse);
    });
  });

  describe('[GET] pokemon/upload/excel', () => {
    it('should return response with list of pokemons', async () => {
      const name = 'bu';
      const generation = [1, 2];
      const evolved = false;

      const request = new SearchPokemonsQueryDto();

      request.name = name;
      request.generation = generation;
      request.evolved = evolved;

      const response = await pokemonController.searchPokemons(request);

      //remove dynamic values
      response.pokemons = response.pokemons.map((pokemon) => {
        delete pokemon.id;
        delete pokemon.created;
        delete pokemon.updated;

        return pokemon;
      });

      expect(response).toMatchObject(testSearchPokemonsResponse);
    });
  });

  afterAll(async () => await repository.query('truncate pokemon_entity'));
});

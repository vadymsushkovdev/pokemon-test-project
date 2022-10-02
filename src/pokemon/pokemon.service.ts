import { Inject, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { isArray, isEmpty, isNil, toPairs } from 'lodash';
import { ILike, In } from 'typeorm';

import { PokemonDto } from './dtos/pokemon.dto';
import { validatorOptions } from './consts/validatior-options.const';
import { ExcelPokemonsValidationResponseType } from './types/excel-pokemons-validation-response.type';
import { PokemonEntity } from './entities/pokemon.entity';
import { PokemonRepository } from './repositories/pokemon.repository';
import { UploadPokemonsExcelReponseDto } from './dtos/upload-pokemons-excel-reponse.dto';
import { SearchPokemonsQueryDto } from './dtos/search-pokemons-query.dto';
import { SearchPokemonsWhereConditionType } from './types/search-pokemons-where-condition.type';
import {
  PokemonResponseDto,
  SearchPokemonsResponseDto,
} from './dtos/search-pokemons-response.dto';

@Injectable()
export class PokemonService {
  constructor(
    @Inject(PokemonRepository)
    private readonly pokemonRepository: PokemonRepository,
  ) {}

  public async searchPokemons(
    searchQuery: SearchPokemonsQueryDto,
  ): Promise<SearchPokemonsResponseDto> {
    const { whereCondition, offset, limit } =
      this.getValuesToQuery(searchQuery);

    const gettingResponse = await this.pokemonRepository.getList(
      whereCondition,
      limit,
      offset,
    );

    return { pokemons: gettingResponse as PokemonResponseDto[] };
  }

  public async uploadPokemonsExcel(
    buffer: Buffer,
  ): Promise<UploadPokemonsExcelReponseDto> {
    const { pokemons, errors } = this.getPokemonsFromExcel(buffer);

    await this.savePokemons(pokemons);

    return { savedPokemons: pokemons.length, errors };
  }

  private getValuesToQuery(searchQuery: SearchPokemonsQueryDto): {
    limit: number;
    offset: number;
    whereCondition: SearchPokemonsWhereConditionType;
  } {
    return toPairs(searchQuery).reduce(
      (acc, [key, value]) => {
        key === 'name'
          ? (acc.whereCondition[key] = ILike(`%${value}%`))
          : key === 'limit'
          ? (acc.limit = value)
          : key === 'offset'
          ? (acc.offset = value)
          : isArray(value)
          ? (acc.whereCondition[key] = In(value))
          : (acc.whereCondition[key] = value);

        return acc;
      },
      { limit: 0, offset: 0, whereCondition: {} } as {
        limit: number;
        offset: number;
        whereCondition: SearchPokemonsWhereConditionType;
      },
    );
  }

  private async savePokemons(pokemons: PokemonDto[]): Promise<void> {
    const pokemonEntities = this.mapPokemonsToEntity(pokemons);

    if (!isEmpty(pokemonEntities))
      await this.pokemonRepository.save(pokemonEntities);
  }

  private mapPokemonsToEntity(pokemons: PokemonDto[]): PokemonEntity[] {
    return pokemons.map((pokemon) => {
      const pokemonEntity = this.pokemonRepository.create();

      pokemonEntity.name = pokemon.Name;
      pokemonEntity.pokedexNumber = pokemon['Pokedex Number'];
      pokemonEntity.imgName = pokemon['Img name'];
      pokemonEntity.generation = pokemon['Generation'];
      pokemonEntity.evolutionStage = pokemon['Evolution Stage'];
      pokemonEntity.evolved = pokemon.Evolved;
      pokemonEntity.familyId = pokemon.FamilyID;
      pokemonEntity.crossGen = pokemon['Cross Gen'];
      pokemonEntity.type1 = pokemon['Type 1'];
      pokemonEntity.type2 = pokemon['Type 2'];
      pokemonEntity.weather1 = pokemon['Weather 1'];
      pokemonEntity.weather2 = pokemon['Weather 2'];
      pokemonEntity.statTotal = pokemon['STAT TOTAL'];
      pokemonEntity.atk = pokemon.ATK;
      pokemonEntity.def = pokemon.DEF;
      pokemonEntity.sta = pokemon.STA;
      pokemonEntity.legendary = pokemon.Legendary;
      pokemonEntity.acquirable = pokemon.Aquireable;
      pokemonEntity.spawns = pokemon.Spawns;
      pokemonEntity.regional = pokemon.Regional;
      pokemonEntity.raidable = pokemon.Raidable;
      pokemonEntity.hatchable = pokemon.Hatchable;
      pokemonEntity.shiny = pokemon.Shiny;
      pokemonEntity.nest = pokemon.Nest;
      pokemonEntity.new = pokemon.New;
      pokemonEntity.notGettable = pokemon['Not-Gettable'];
      pokemonEntity.futureEvolve = pokemon['Future Evolve'];
      pokemonEntity.fullCP40 = pokemon['100% CP @ 40'];
      pokemonEntity.fullCP39 = pokemon['100% CP @ 39'];

      return pokemonEntity;
    });
  }

  private getPokemonsFromExcel(
    buffer: Buffer,
  ): ExcelPokemonsValidationResponseType {
    const workBook: XLSX.WorkBook = XLSX.read(buffer);
    const sheetName = workBook?.SheetNames[0];
    const sheet: XLSX.WorkSheet = workBook.Sheets[sheetName];

    const excelPokemons = XLSX.utils.sheet_to_json(sheet) as PokemonDto[];

    return this.validateExcelPokemons(excelPokemons);
  }

  private validateExcelPokemons(
    excelPokemons: PokemonDto[],
  ): ExcelPokemonsValidationResponseType {
    return excelPokemons.reduce(
      (acc, excelPokemon) => {
        const pokemon: PokemonDto = plainToClass(PokemonDto, excelPokemon, {
          exposeUnsetFields: false,
        });

        const errors = validateSync(pokemon, validatorOptions);

        if (!isEmpty(errors)) {
          const error = errors.reduce((acc, { target, constraints }) => {
            const name = (target as PokemonDto).Name;

            !isNil(acc[name])
              ? acc[name].push(constraints)
              : (acc[name] = [constraints]);

            return acc;
          }, {} as Record<string, Record<string, string>[]>);

          acc.errors.push(error);

          return acc;
        }

        acc.pokemons.push(pokemon);

        return acc;
      },
      { errors: [], pokemons: [] } as ExcelPokemonsValidationResponseType,
    );
  }
}

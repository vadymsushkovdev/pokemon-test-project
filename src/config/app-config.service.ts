import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PokemonEntity } from '../pokemon/entities/pokemon.entity';

@Injectable()
export class AppConfigService {
  private readonly dbConfig: TypeOrmModuleOptions;

  constructor(private readonly configService: ConfigService) {
    this.dbConfig = {
      type: 'postgres',
      host: configService.get<string>('POSTGRES_HOST'),
      port: configService.get<number>('POSTGRES_PORT'),
      username: configService.get<string>('POSTGRES_USER'),
      password: configService.get<string>('POSTGRES_PASSWORD'),
      database: configService.get<string>('POSTGRES_DATABASE'),
      entities: [PokemonEntity],
      synchronize: true,
      logging: false,
    };
  }

  public getDBConfig(): TypeOrmModuleOptions {
    return this.dbConfig;
  }
}

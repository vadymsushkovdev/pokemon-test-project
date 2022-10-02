import { Module } from '@nestjs/common';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { TypeOrmExModule } from '../common/modules/typeorm_ex.module';
import { PokemonRepository } from './repositories/pokemon.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonEntity } from './entities/pokemon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PokemonEntity]),
    TypeOrmExModule.forCustomRepository(PokemonRepository),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}

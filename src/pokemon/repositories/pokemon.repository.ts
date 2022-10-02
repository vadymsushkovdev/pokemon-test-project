import { CustomRepository } from '../../db/typeorm_ex.decorator';
import {
  Between,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Pokemon } from '../entities/pokemon.entity';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { PokemonType } from '../../enums/pokemonType';

@CustomRepository(Pokemon)
export class PokemonRepository extends Repository<Pokemon> {
  async getByName(
    pokemonName: string,
    skip?: number,
    limit?: number,
  ): Promise<Pokemon[]> {
    return await this.find({
      where: {
        name: ILike(`%${pokemonName}%`),
      },
      skip: skip ?? 0,
      take: limit ?? 0,
    });
  }

  async searchPokemon(
    pokedexNumber?: number,
    pokemonType1?: PokemonType,
    pokemonType2?: PokemonType,
    minStatTotal?: number,
    maxStatTotal?: number,
    isCrossGen?: boolean,
    offset?: number,
    limit?: number,
  ): Promise<Pokemon[]> {
    return await this.find({
      where: {
        ...(!isNil(pokedexNumber) && { pokedexNumber: pokedexNumber }),
        ...(!isNil(pokemonType1) && !isNil(pokemonType2)
          ? {
              type1: pokemonType1,
              type2: pokemonType2,
            }
          : !isNil(pokemonType1) && { type1: pokemonType1 }),
        ...(!isNil(minStatTotal) && !isNil(maxStatTotal)
          ? {
              statTotal: Between(minStatTotal, maxStatTotal),
            }
          : (!isNil(minStatTotal) && {
              statTotal: MoreThanOrEqual(minStatTotal),
            }) ||
            (!isNil(maxStatTotal) && {
              statTotal: LessThanOrEqual(maxStatTotal),
            })),
        ...(!isNil(isCrossGen) && { crossGen: isCrossGen }),
      },
      skip: offset ?? 0,
      take: limit ?? 0,
      order: {
        statTotal: isNil(minStatTotal) && maxStatTotal ? 'DESC' : 'ASC',
      },
    });
  }
}

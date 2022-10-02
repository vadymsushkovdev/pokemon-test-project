import { Repository } from 'typeorm';

import { CustomRepository } from '../../common/decorators/typeorm_ex.decorator';
import { PokemonEntity } from '../entities/pokemon.entity';
import { SearchPokemonsWhereConditionType } from '../types/search-pokemons-where-condition.type';

@CustomRepository(PokemonEntity)
export class PokemonRepository extends Repository<PokemonEntity> {
  public async getList(
    where: SearchPokemonsWhereConditionType,
    take: number,
    skip: number,
  ): Promise<PokemonEntity[]> {
    return await this.find({
      where,
      take,
      skip,
    });
  }
}

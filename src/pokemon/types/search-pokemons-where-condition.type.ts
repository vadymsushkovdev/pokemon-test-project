import { FindOperator } from 'typeorm';
import { PokemonType } from '../enums/pokemon-type.enum';

export type SearchPokemonsWhereConditionType = Record<
  string,
  string | boolean | FindOperator<number | PokemonType | string>
>;

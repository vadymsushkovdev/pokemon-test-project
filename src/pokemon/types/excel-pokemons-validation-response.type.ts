import { PokemonDto } from '../dtos/pokemon.dto';

export type ExcelPokemonsValidationResponseType = {
  errors: Record<string, Record<string, string>[]>[];
  pokemons: PokemonDto[];
};

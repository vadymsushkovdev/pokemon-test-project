import { ApiProperty } from '@nestjs/swagger';

export class PokemonResponseDto {
  @ApiProperty({ type: Date, example: '2022-10-01T21:35:19.496Z' })
  updated: Date;

  @ApiProperty({ type: Date, example: '2022-10-01T21:35:19.496Z' })
  created: Date;

  @ApiProperty({ type: Number, example: 3811 })
  id: number;

  @ApiProperty({ type: String, example: 'Bulbasaur' })
  name: string;

  @ApiProperty({ type: Number, example: 1 })
  pokedexNumber: number;

  @ApiProperty({ type: String, example: '1' })
  imgName: string;

  @ApiProperty({ type: Number, example: 1 })
  generation: number;

  @ApiProperty({ type: String, example: '1' })
  evolutionStage: string;

  @ApiProperty({ type: Boolean, example: false })
  evolved: boolean;

  @ApiProperty({ type: Number, example: 1 })
  familyId: number;

  @ApiProperty({ type: Boolean, example: false })
  crossGen: boolean;

  @ApiProperty({ type: String, example: 'grass' })
  type1: string;

  @ApiProperty({ type: String, example: 'poison' })
  type2: string;

  @ApiProperty({ type: String, example: 'Sunny/clean' })
  weather1: string;

  @ApiProperty({ type: String, example: 'Cloudy' })
  weather2: string;

  @ApiProperty({ type: Number, example: 326 })
  statTotal: number;

  @ApiProperty({ type: Number, example: 118 })
  atk: number;

  @ApiProperty({ type: Number, example: 118 })
  def: number;

  @ApiProperty({ type: Number, example: 90 })
  sta: number;

  @ApiProperty({ type: Number, example: 0 })
  legendary: number;

  @ApiProperty({ type: Boolean, example: false })
  acquirable: boolean;

  @ApiProperty({ type: Boolean, example: false })
  spawns: boolean;

  @ApiProperty({ type: Boolean, example: false })
  regional: boolean;

  @ApiProperty({ type: Number, example: 0 })
  raidable: number;

  @ApiProperty({ type: Number, example: 5 })
  hatchable: number;

  @ApiProperty({ type: Number, example: 0 })
  shiny: number;

  @ApiProperty({ type: Boolean, example: true })
  nest: boolean;

  @ApiProperty({ type: Boolean, example: false })
  new: boolean;

  @ApiProperty({ type: Boolean, example: false })
  notGettable: boolean;

  @ApiProperty({ type: Boolean, example: false })
  futureEvolve: boolean;

  @ApiProperty({ type: Number, example: 981 })
  fullCP40: number;

  @ApiProperty({ type: Number, example: 967 })
  fullCP39: number;
}

export class SearchPokemonsResponseDto {
  @ApiProperty({ type: PokemonResponseDto, isArray: true })
  pokemons: PokemonResponseDto[];
}

import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Exclude, Transform } from 'class-transformer';
import { isNumber } from 'lodash';

import { PokemonType } from '../enums/pokemon-type.enum';

export class PokemonDto {
  @Exclude()
  Row: number;

  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsNotEmpty()
  @IsNumber()
  'Pokedex Number': number;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (isNumber(value) ? String(value) : value))
  'Img name': string;

  @IsNotEmpty()
  @IsNumber()
  Generation: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (isNumber(value) ? String(value) : value))
  'Evolution Stage': string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 1)
  Evolved: boolean;

  @IsOptional()
  @IsNumber()
  FamilyID: number;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 1)
  'Cross Gen': boolean;

  @IsNotEmpty()
  @IsEnum(PokemonType)
  'Type 1': PokemonType;

  @IsOptional()
  @IsEnum(PokemonType)
  'Type 2': PokemonType | null;

  @IsNotEmpty()
  @IsString()
  'Weather 1': string;

  @IsOptional()
  @IsString()
  'Weather 2': string;

  @IsNotEmpty()
  @IsNumber()
  'STAT TOTAL': number;

  @IsNotEmpty()
  @IsNumber()
  ATK: number;

  @IsNotEmpty()
  @IsNumber()
  DEF: number;

  @IsNotEmpty()
  @IsNumber()
  STA: number;

  @IsNotEmpty()
  @IsNumber()
  Legendary: number;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 1)
  Aquireable: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 1)
  Spawns: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 1)
  Regional: boolean;

  @IsNotEmpty()
  @IsNumber()
  Raidable: number;

  @IsNotEmpty()
  @IsNumber()
  Hatchable: number;

  @IsNotEmpty()
  @IsNumber()
  Shiny: number;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 1)
  Nest: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 1)
  New: boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 1)
  'Not-Gettable': boolean;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 1)
  'Future Evolve': boolean;

  @IsNotEmpty()
  @IsNumber()
  '100% CP @ 40': number;

  @IsNotEmpty()
  @IsNumber()
  '100% CP @ 39': number;
}

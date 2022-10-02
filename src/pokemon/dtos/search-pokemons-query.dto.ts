import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

import { PokemonType } from '../enums/pokemon-type.enum';

export class SearchPokemonsQueryDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ type: Number, required: false, isArray: true })
  @IsOptional()
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  pokedexNumber: number[];

  @ApiProperty({ type: String, required: false, isArray: true })
  @IsOptional()
  @IsString({ each: true })
  imgName: string[];

  @ApiProperty({ type: Number, required: false, isArray: true })
  @IsOptional()
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  generation: number[];

  @ApiProperty({ type: String, required: false, isArray: true })
  @IsOptional()
  @IsString({ each: true })
  evolutionStage: string[];

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' ? true : value === 'false' ? false : value;
  })
  evolved: boolean;

  @ApiProperty({ type: Number, required: false, isArray: true })
  @IsOptional()
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  familyId: number[];

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true' ? true : value === 'false' ? false : value;
  })
  crossGen: boolean;

  @ApiProperty({ enum: PokemonType, required: false, isArray: true })
  @IsOptional()
  @IsEnum(PokemonType, { each: true })
  type1: PokemonType[];

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit = 10;

  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  offset = 0;
}

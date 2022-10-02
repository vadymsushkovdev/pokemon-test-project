import { ApiProperty } from '@nestjs/swagger';

export class UploadPokemonsExcelReponseDto {
  @ApiProperty({ type: Number, example: 23 })
  savedPokemons: number;

  @ApiProperty({ type: Array, example: [] })
  errors: Record<string, Record<string, string>[]>[];
}

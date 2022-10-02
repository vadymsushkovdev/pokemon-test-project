import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { PokemonService } from './pokemon.service';
import { ExcelDto } from './dtos/excel.dto';
import { UploadPokemonsExcelReponseDto } from './dtos/upload-pokemons-excel-reponse.dto';
import { SearchPokemonsQueryDto } from './dtos/search-pokemons-query.dto';
import { SearchPokemonsResponseDto } from './dtos/search-pokemons-response.dto';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post('upload/excel')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ type: UploadPokemonsExcelReponseDto })
  public async uploadPokemonsExcel(
    @UploadedFile() file: ExcelDto,
  ): Promise<UploadPokemonsExcelReponseDto> {
    return await this.pokemonService.uploadPokemonsExcel(file.buffer);
  }

  @Get()
  @ApiOkResponse({ type: SearchPokemonsResponseDto })
  public async searchPokemons(
    @Query() query: SearchPokemonsQueryDto,
  ): Promise<SearchPokemonsResponseDto> {
    return await this.pokemonService.searchPokemons(query);
  }
}

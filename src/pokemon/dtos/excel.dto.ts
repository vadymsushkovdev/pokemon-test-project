import { IsIn, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

import { allowedExcelMimotypesConst } from '../consts/allowed-excel-mimotypes.const';

export class ExcelDto {
  @IsNotEmpty()
  @IsIn(allowedExcelMimotypesConst)
  mimetype: string;

  @IsNotEmpty()
  @Type(() => Buffer)
  buffer: Buffer;
}

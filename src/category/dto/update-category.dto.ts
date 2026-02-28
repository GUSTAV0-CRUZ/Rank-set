import { IsMongoId, IsOptional } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsOptional()
  @IsMongoId({ each: true })
  @Type(() => Array)
  players: string[] | string;
}

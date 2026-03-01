import { ArrayMinSize, IsArray, IsMongoId, IsOptional } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { EventOfCategory } from '../entities/category.entity';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsOptional()
  @IsMongoId({ each: true })
  @Type(() => Array)
  addPlayers: string[] | string;

  @IsOptional()
  @IsMongoId({ each: true })
  @Type(() => Array)
  removePlayers: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  addEvents: EventOfCategory[];

  @IsOptional()
  @IsArray()
  @Type(() => Array)
  removeEvents: EventOfCategory[];
}

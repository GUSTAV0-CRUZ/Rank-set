import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EventOfCategory } from '../entities/category.entity';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  descripion: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  events: EventOfCategory[];
}

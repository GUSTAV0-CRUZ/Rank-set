import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import { Result } from '../entities/match.entity';

export class UpdateMatchDto {
  @IsNotEmpty()
  @IsMongoId({ each: true })
  def: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Array<Result>)
  result: Result[];
}

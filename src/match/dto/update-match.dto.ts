import { Type } from 'class-transformer';
import { IsMongoId } from 'class-validator';
import { Result } from '../entities/match.entity';

export class UpdateMatchDto {
  @IsMongoId({ each: true })
  def: string;

  @Type(() => Array<Result>)
  result: Result[];
}

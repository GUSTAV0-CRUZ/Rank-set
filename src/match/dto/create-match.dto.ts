import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Result } from '../entities/match.entity';

export class CreateMatchDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsOptional()
  @IsMongoId({ each: true })
  @Type(() => Array)
  players: string[] | string;

  @IsMongoId({ each: true })
  def: string;

  @Type(() => Array<Result>)
  result: Result[];
}

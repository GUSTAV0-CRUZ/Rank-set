import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Result } from '../entities/match.entity';
import { Player } from 'src/player/entities/Player.entitie';

export class CreateMatchDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsOptional()
  @IsMongoId({ each: true })
  @Type(() => Array)
  players: Player[];

  @IsMongoId({ each: true })
  def: Player;

  @Type(() => Array<Result>)
  result: Result[];
}

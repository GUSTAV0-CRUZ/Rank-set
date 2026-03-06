import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import { Result } from '../entities/match.entity';
import { Player } from 'src/player/entities/Player.entitie';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsMongoId({ each: true })
  def: Player;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Array<Result>)
  result: Result[];

  @IsNotEmpty()
  @IsMongoId({ each: true })
  challengeId: string;
}

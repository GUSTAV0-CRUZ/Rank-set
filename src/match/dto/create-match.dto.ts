import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Player } from 'src/player/entities/Player.entitie';

export class CreateMatchDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsMongoId({ each: true })
  @Type(() => Array)
  players: Player[];
}

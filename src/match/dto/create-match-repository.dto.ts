import { Player } from 'src/player/entities/Player.entitie';
import { Result } from '../entities/match.entity';

export class CreateMatchRepositoryDto {
  category: string;
  players: Player[];
  def: Player;
  result: Result[];
}

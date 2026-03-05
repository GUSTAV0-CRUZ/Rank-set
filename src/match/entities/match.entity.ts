import { Player } from 'src/player/entities/Player.entitie';

export class Match {
  category: string;
  players: Player[];
  def: Player;
  result: Result[];
}

export class Result {
  set: string;
}

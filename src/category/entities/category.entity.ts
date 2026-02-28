import { Player } from 'src/player/entities/Player.entitie';

export class Category {
  name: string;
  descripion: string;
  events: EventOfCategory[];
  players: Player[];
}

export interface EventOfCategory {
  name: string;
  operation: string;
  value: number;
}

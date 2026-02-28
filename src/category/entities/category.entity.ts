import { Player } from 'src/player/entities/Player.entitie';

export class Category {
  name: string;
  descripion: string;
  events: Event[];
  players: Player[];
}

export interface Evento {
  name: string;
  operation: string;
  value: number;
}

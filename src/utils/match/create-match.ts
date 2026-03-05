import { Player } from 'src/player/entities/Player.entitie';
import { createPlayer } from '../player/create-player';
import { Match } from 'src/match/entities/match.entity';

export function createMatch(): Match {
  const player = createPlayer('idPlayerOne');
  const playerOne: unknown = 'idPlayerOne';
  const playerTwo: unknown = 'idPlayerTwo';
  return {
    category: 'Category A',
    players: [playerOne as Player, playerTwo as Player],
    def: player,
    result: [
      {
        set: 'playerOne wins',
      },
    ],
  };
}

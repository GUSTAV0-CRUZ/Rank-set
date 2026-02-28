import { Player } from 'src/player/entities/Player.entitie';

export function createPlayer(): Player {
  return {
    tell: '94973485723',
    email: 'test@gmail.com',
    name: 'test',
    ranking: 'A',
    positionRanking: 1,
    pictureUrl: 'http://localhost:3000/picture/1',
  };
}

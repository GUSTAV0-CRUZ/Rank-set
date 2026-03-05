import { Types } from 'mongoose';
import { Player } from 'src/player/entities/Player.entitie';

export function createPlayer(idForPlayer?: unknown): Player {
  const id: unknown = 'IdPlayer';
  return {
    _id: (idForPlayer as Types.ObjectId) ?? (id as Types.ObjectId),
    tell: '94973485723',
    email: 'test@gmail.com',
    name: 'test',
    ranking: 'A',
    positionRanking: 1,
    pictureUrl: 'http://localhost:3000/picture/1',
  };
}

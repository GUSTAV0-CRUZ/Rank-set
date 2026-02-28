import { Types } from 'mongoose';

export interface Player {
  _id?: Types.ObjectId;
  tell: string;
  email: string;
  name: string;
  ranking: string;
  positionRanking: number;
  pictureUrl: string;
}

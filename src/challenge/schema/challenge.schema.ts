import { Player } from 'src/player/entities/Player.entitie';
import { ChallengeStatus } from '../enums/challenge-status.enum';
import { Challenge, Match } from '../entities/challenge.entity';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class MatchSubSchemaDb implements Match {
  category: string;
  players: Player[];
  def: Player;
  result: Result[];
}

export const MatchSubSchema = SchemaFactory.createForClass(MatchSubSchemaDb);

export type ChallengeDocument = Document & ChallengeSchemaDb;

@Schema({ timestamps: true })
export class ChallengeSchemaDb implements Challenge {
  @Prop({ type: Date })
  dateHourChallenge: Date;

  @Prop({ type: Date })
  dateHourRequest: Date;

  @Prop({ type: Date })
  dateHourResponse: Date;

  @Prop({
    type: String,
    enum: ChallengeStatus,
    default: ChallengeStatus.PENDING,
  })
  status: ChallengeStatus;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'players' })
  applicant: Player;

  @Prop({ type: String })
  category: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'players',
    },
  ])
  players: Player[];

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'matchs' })
  match: Match;
}

export class Result {
  set: string;
}

export const ChallengeSchema = SchemaFactory.createForClass(ChallengeSchemaDb);

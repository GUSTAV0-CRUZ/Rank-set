import { Player } from 'src/player/entities/Player.entitie';
import { ChallengeStatus } from '../enums/challenge-status.enum';

export class Challenge {
  dateHourChallenge: Date;
  dateHourRequest: Date;
  dateHourResponse: Date;
  status: ChallengeStatus;
  applicant: Player;
  category: string;
  players: Player[];
  match: Match;
}

export class Match {
  category: string;
  players: Player[];
  def: Player;
  result: Result[];
}

export class Result {
  set: string;
}

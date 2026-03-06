import { Challenge } from 'src/challenge/entities/challenge.entity';
import { ChallengeStatus } from 'src/challenge/enums/challenge-status.enum';
import { createPlayer } from '../player/create-player';
import { Match } from 'src/match/entities/match.entity';

export function createChallenge(match?: Match): Challenge {
  const player = createPlayer();
  return {
    dateHourChallenge: new Date(),
    dateHourRequest: new Date(),
    dateHourResponse: new Date(),
    status: ChallengeStatus.PENDING,
    applicant: player,
    category: 'Category A',
    players: match?.players ?? [],
    match: match ?? {
      category: 'Category A',
      players: [],
      def: player,
      result: [],
    },
  };
}

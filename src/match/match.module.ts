import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchSchema } from './schema/match.schema';
import { MatchRepository } from './repository/match.repository';
import { ChallengeService } from 'src/challenge/challenge.service';
import { ChallengeModule } from 'src/challenge/challenge.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Match', schema: MatchSchema }]),
    ChallengeModule,
  ],
  controllers: [MatchController],
  providers: [MatchService, MatchRepository, ChallengeService],
})
export class MatchModule {}

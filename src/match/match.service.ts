import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchRepository } from './repository/match.repository';
import { Match } from './entities/match.entity';
import { ChallengeService } from 'src/challenge/challenge.service';

@Injectable()
export class MatchService {
  constructor(
    private readonly matchRepository: MatchRepository,
    private readonly challengeService: ChallengeService,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const { challengeId, def, result } = createMatchDto;
    const challenge = await this.challengeService.findOne(challengeId);

    const { category, players } = challenge;

    try {
      const match = await this.matchRepository.create({
        category,
        players,
        def,
        result,
      });
      return match;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Match[]> {
    return await this.matchRepository.findAll();
  }

  async findOne(id: string): Promise<Match> {
    try {
      const match = await this.matchRepository.findOneId(id);

      if (!match) throw new NotFoundException();

      return match;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.status === 404) throw new NotFoundException('Match not found');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateMatchDto: UpdateMatchDto): Promise<Match> {
    try {
      const match = await this.matchRepository.update(id, updateMatchDto);

      if (!match) throw new NotFoundException();

      return match;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.status === 404) throw new NotFoundException('Match not found');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string): Promise<Match> {
    try {
      const match = await this.matchRepository.delete(id);

      if (!match) throw new NotFoundException();

      return match;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.status === 404) throw new NotFoundException('Match not found');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.message);
    }
  }
}

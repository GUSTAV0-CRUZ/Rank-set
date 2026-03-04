/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeRepository } from './repository/challenge.repository';
import { PlayerService } from 'src/player/player.service';
import { CategoryService } from 'src/category/category.service';
import { ChallengeStatus } from './enums/challenge-status.enum';
import { Challenge } from './entities/challenge.entity';

@Injectable()
export class ChallengeService {
  constructor(
    private readonly challengeRepository: ChallengeRepository,
    private readonly playerService: PlayerService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    try {
      const { players, applicant, dateHourChallenge } = createChallengeDto;

      const idOne: unknown = players[0];
      const idTwo: unknown = players[1];

      await this.playerService.findOne(idOne as any);
      await this.playerService.findOne(idTwo as any);

      if (idOne !== applicant && idTwo !== applicant)
        throw new BadRequestException(
          'Applicant not is one player of challenge',
        );

      const category = await this.categoryService.findCategoryContainPlayerId(
        idOne as string,
      );

      const challenge = {
        dateHourChallenge,
        applicant,
        players,
        dateHourRequest: new Date(),
        status: ChallengeStatus.PENDING,
        category: category.name,
      };

      const newChallenge = this.challengeRepository.create(challenge);

      return newChallenge;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.challengeRepository.findAll();
  }

  async findOne(id: string): Promise<Challenge> {
    try {
      const challenge = await this.challengeRepository.findOneId(id);

      if (!challenge) throw new NotFoundException();

      return challenge;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.status === 404)
        throw new NotFoundException('Challenge not found');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.message);
    }
  }

  async findChallengesByIdPlayer(id: string): Promise<Challenge[]> {
    try {
      const challenge =
        await this.challengeRepository.findChallengesByIdPlayer(id);

      if (!challenge) throw new NotFoundException();

      return challenge;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.status === 404)
        throw new NotFoundException('Challenge not found');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: string,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<Challenge> {
    try {
      const challenge = await this.challengeRepository.update(
        id,
        updateChallengeDto,
      );

      if (!challenge) throw new NotFoundException();

      return challenge;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.status === 404)
        throw new NotFoundException('Challenge not found');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.message);
    }
  }

  remove(id: string) {
    return `This action removes a #${id} challenge`;
  }
}

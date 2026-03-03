/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeRepository } from './repository/challenge.repository';
import { PlayerService } from 'src/player/player.service';
import { CategoryService } from 'src/category/category.service';
import { ChallengeStatus } from './enums/challenge-status.enum';

@Injectable()
export class ChallengeService {
  constructor(
    private readonly challengeRepository: ChallengeRepository,
    private readonly playerService: PlayerService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createChallengeDto: CreateChallengeDto) {
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

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge dto ${updateChallengeDto.applicant?.name}`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}

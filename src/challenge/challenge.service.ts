import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { ChallengeRepository } from './repository/challenge.repository';

@Injectable()
export class ChallengeService {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  create(createChallengeDto: CreateChallengeDto) {
    return 'This action adds a new challenge';
  }

  findAll() {
    return this.challengeRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} challenge`;
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return `This action updates a #${id} challenge`;
  }

  remove(id: number) {
    return `This action removes a #${id} challenge`;
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchRepository } from './repository/match.repository';

@Injectable()
export class MatchService {
  constructor(private readonly matchRepository: MatchRepository) {}

  async create(createMatchDto: CreateMatchDto) {
    try {
      const match = await this.matchRepository.create(createMatchDto);
      return match;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all match`;
  }

  findOne(id: string) {
    return `This action returns a #${id} match`;
  }

  update(id: string, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: string) {
    return `This action removes a #${id} match`;
  }
}

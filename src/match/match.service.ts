import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchRepository } from './repository/match.repository';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchService {
  constructor(private readonly matchRepository: MatchRepository) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    try {
      const match = await this.matchRepository.create(createMatchDto);
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
      if (error.status === 404)
        throw new NotFoundException('Challenge not found');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new BadRequestException(error.message);
    }
  }

  update(id: string, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: string) {
    return `This action removes a #${id} match`;
  }
}

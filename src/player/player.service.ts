/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PlayerRepository } from './repository/player.repository';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './entities/Player.entitie';

@Injectable()
export class PlayerService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async findAll(): Promise<Player[]> {
    return await this.playerRepository.findAll();
  }

  async findOne(id: string): Promise<Player> {
    try {
      const player = await this.playerRepository.findOneId(id);

      if (!player) throw new NotFoundException();

      return player;
    } catch (error) {
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      if (error.status === 404) throw new NotFoundException('Player not found');

      throw new BadRequestException(error.message);
    }
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    try {
      const player = await this.playerRepository.create(createPlayerDto);
      return player;
    } catch (error) {
      if (JSON.stringify(error.keyPattern) === JSON.stringify({ tell: 1 }))
        throw new BadRequestException('Value of key tell is duplicate');

      if (JSON.stringify(error.keyPattern) === JSON.stringify({ email: 1 }))
        throw new BadRequestException('Value of key email is duplicate');

      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    try {
      const updatedPlayer = await this.playerRepository.update(
        id,
        updatePlayerDto,
      );

      if (!updatedPlayer) throw new NotFoundException();

      return updatedPlayer;
    } catch (error) {
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      if (error.status === 404) throw new NotFoundException('Player not found');

      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string): Promise<Player> {
    try {
      const deletedPlayer = await this.playerRepository.delete(id);
      if (!deletedPlayer) throw new NotFoundException();
      return deletedPlayer;
    } catch (error) {
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      if (error.status === 404) throw new NotFoundException('Player not found');

      throw new BadRequestException(error.message);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/createPlayer.dto';
import { UpdatePlayerDto } from '../dtos/updatePlayer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerDocument } from '../schema/player.schema';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectModel('Player')
    private playerModel: Model<PlayerDocument>,
  ) {}

  findAll() {
    return this.playerModel.find();
  }

  findOneId(id: string) {
    return this.playerModel.findById(id).exec();
  }

  create(createPlayerDto: CreatePlayerDto) {
    return this.playerModel.create(createPlayerDto);
  }

  update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.playerModel.findByIdAndUpdate(id, updatePlayerDto).exec();
  }

  delete(id: string) {
    return this.playerModel.findByIdAndDelete(id).exec();
  }
}

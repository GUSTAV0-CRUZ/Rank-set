import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { Model } from 'mongoose';
import { MatchDocument } from '../schema/match.schema';
import { CreateMatchRepositoryDto } from '../dto/create-match-repository.dto';

@Injectable()
export class MatchRepository {
  constructor(
    @InjectModel('Match')
    private matchModel: Model<MatchDocument>,
  ) {}

  findAll() {
    return this.matchModel.find().exec();
  }

  findOneId(id: string) {
    return this.matchModel.findById(id).exec();
  }

  create(creatematchDto: CreateMatchRepositoryDto) {
    return this.matchModel.create(creatematchDto);
  }

  update(id: string, updatematchDto: UpdateMatchDto) {
    return this.matchModel
      .findByIdAndUpdate(id, updatematchDto, { returnDocument: 'after' })
      .exec();
  }

  delete(id: string) {
    return this.matchModel.findByIdAndDelete(id).exec();
  }
}

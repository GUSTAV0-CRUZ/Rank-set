import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChallengeDocument } from '../schema/challenge.schema';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { UpdateChallengeDto } from '../dto/update-challenge.dto';

@Injectable()
export class ChallengeRepository {
  constructor(
    @InjectModel('Challenge')
    private challengeModel: Model<ChallengeDocument>,
  ) {}

  findAll() {
    return this.challengeModel.find();
  }

  findOneId(id: string) {
    return this.challengeModel.findById(id).exec();
  }

  create(createChallengeDto: CreateChallengeDto) {
    return this.challengeModel.create(createChallengeDto);
  }

  update(id: string, updateChallengeDto: UpdateChallengeDto) {
    return this.challengeModel
      .findByIdAndUpdate(id, updateChallengeDto, { returnDocument: 'after' })
      .exec();
  }

  delete(id: string) {
    return this.challengeModel.findByIdAndDelete(id).exec();
  }
}

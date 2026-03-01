import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyBulkWriteOperation, Model } from 'mongoose';
import { CategoryDocument } from '../schemas/category.schema';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel('Category')
    private categoryModel: Model<CategoryDocument>,
  ) {}

  findAll() {
    return this.categoryModel.find().populate('players').exec();
  }

  findOneId(id: string) {
    return this.categoryModel.findById(id).populate('players').exec();
  }

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { name, addPlayers, description, events, removePlayers } =
      updateCategoryDto;

    const operations = [
      {
        updateOne: {
          filter: { _id: id },
          update: {
            $set: { name, description },
            $pull: { players: { $in: removePlayers ?? [] } },
          },
        },
      },
      {
        updateOne: {
          filter: { _id: id },
          update: {
            $addToSet: {
              players: { $each: addPlayers ?? [] },
              events: { $each: events ?? [] },
            },
          },
        },
      },
    ];

    await this.categoryModel.bulkWrite(
      operations as AnyBulkWriteOperation<CategoryDocument>[],
    );
    return this.categoryModel.findById(id).exec();
  }

  delete(id: string) {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}

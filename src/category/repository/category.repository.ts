import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { name, players, descripion, events } = updateCategoryDto;

    return this.categoryModel
      .findOneAndUpdate(
        { _id: id },
        {
          $set: { name, descripion },
          $addToSet: {
            players: { $each: players ?? [] },
            events: { $each: events ?? [] },
          },
        },
        { returnDocument: 'after' },
      )
      .exec();
  }

  delete(id: string) {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}

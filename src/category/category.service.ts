/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const player = await this.categoryRepository.create(createCategoryDto);

      return player;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const erroFildRequired: string | undefined = error?.message?.split(
        'Path',
      )[1] as string;
      if (erroFildRequired)
        throw new BadRequestException(`Fild:${erroFildRequired}`);
      if (JSON.stringify(error.keyPattern) === JSON.stringify({ name: 1 }))
        throw new BadRequestException('Value of key name is duplicate');

      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryRepository.findOneId(id);

      if (!category) throw new NotFoundException();

      return category;
    } catch (error) {
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      if (error.status === 404)
        throw new NotFoundException('Category not found');

      throw new BadRequestException(error.message);
    }
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} ${updateCategoryDto.name} category`;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}

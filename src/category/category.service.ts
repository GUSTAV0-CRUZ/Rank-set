/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repository/category.repository';
import { Category } from './entities/category.entity';
import { AddPlayerDto } from './dto/add-player.dto';
import { RemovePlayerDto } from './dto/remove-player.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = await this.categoryRepository.create(createCategoryDto);

      return category;
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

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll();
  }

  async findOne(id: string): Promise<Category> {
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

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const updatedCategory = await this.categoryRepository.update(
        id,
        updateCategoryDto,
      );

      if (!updatedCategory) throw new BadRequestException('Category not found');

      return updatedCategory;
    } catch (error) {
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string): Promise<Category> {
    try {
      const deletedCategory = await this.categoryRepository.delete(id);
      if (!deletedCategory) throw new BadRequestException('Category not found');
      return deletedCategory;
    } catch (error) {
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      throw new BadRequestException(error.message);
    }
  }

  async addPlayers(id: string, addPlayerDto: AddPlayerDto): Promise<Category> {
    try {
      const updatedCategory = await this.categoryRepository.addPlayers(
        id,
        addPlayerDto,
      );

      if (!updatedCategory) throw new BadRequestException('Category not found');

      return updatedCategory;
    } catch (error) {
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      throw new BadRequestException(error.message);
    }
  }

  async removePlayers(
    id: string,
    removePlayerDto: RemovePlayerDto,
  ): Promise<Category> {
    try {
      const updatedCategory = await this.categoryRepository.removePlayers(
        id,
        removePlayerDto,
      );

      if (!updatedCategory) throw new BadRequestException('Category not found');

      return updatedCategory;
    } catch (error) {
      if (error.path === '_id')
        throw new BadRequestException('Type of id invalid');

      throw new BadRequestException(error.message);
    }
  }
}

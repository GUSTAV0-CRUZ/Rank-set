import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AddPlayerDto } from './dto/add-player.dto';
import { RemovePlayerDto } from './dto/remove-player.dto';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Patch(':id/addPlayer')
  addPlayer(@Param('id') id: string, @Body() addPlayerDto: AddPlayerDto) {
    return this.categoryService.addPlayer(id, addPlayerDto);
  }

  @Patch(':id/removePlayer')
  removePlayer(
    @Param('id') id: string,
    @Body() removePlayerDto: RemovePlayerDto,
  ) {
    return this.categoryService.removePlayer(id, removePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}

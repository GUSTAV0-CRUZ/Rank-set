import { Category } from 'src/category/entities/category.entity';

export function createCategory(): Category {
  return {
    name: 'Any Name',
    description: 'Any description',
    events: [],
    players: [],
  };
}

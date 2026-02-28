import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category, EventOfCategory } from '../entities/category.entity';
import { Player } from 'src/player/entities/Player.entitie';
import { SchemaTypes } from 'mongoose';

export type PlayerDocument = CategorySchemaDb & Document;

@Schema({ timestamps: true })
export class CategorySchemaDb implements Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  descripion: string;

  events: EventOfCategory[];

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Player' }] })
  players: Player[];
}

export const CategorySchema = SchemaFactory.createForClass(CategorySchemaDb);

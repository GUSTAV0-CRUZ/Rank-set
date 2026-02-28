import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PlayerModule,
    MongooseModule.forRoot(String(process.env.MONGODB_CONECTION)),
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News, UserEntity])],
  controllers: [NewsController],
  providers: [NewsService, JwtService, UserService],
})
export class NewsModule {}

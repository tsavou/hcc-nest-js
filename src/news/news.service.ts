import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class NewsService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto, userId: number): Promise<News> {
    const user = await this.userService.findOne(userId);

    const news = this.newsRepository.create({
      ...createNewsDto,
      user: user,
    });

    return await this.newsRepository.save(news);
  }

  async findAll() {
    return await this.newsRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    return await this.newsRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
  }
}

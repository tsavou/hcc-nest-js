import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../user/entities/user.entity';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles([UserRole.CONTRIBUTOR])
  @Post('publish')
  async create(@Body() createNewsDto: CreateNewsDto, @Req() req) {
    const userId = req.user.id;
    return await this.newsService.create(createNewsDto, userId);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { RolesGuard } from '../guards/roles.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../user/entities/user.entity';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles([UserRole.COACH])
  @Post()
  async create(@Body() createMatchDto: CreateMatchDto, @Req() req) {
    const userId = req.user.id;
    return await this.matchService.create(createMatchDto, userId);
  }

  @Get()
  async findAll() {
    return await this.matchService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.matchService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles([UserRole.COACH])
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMatchDto: UpdateMatchDto,
  ) {
    return await this.matchService.update(+id, updateMatchDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles([UserRole.PLAYER])
  @Put(':matchId/join')
  async join(@Param('matchId') matchId: string, @Req() req) {
    const userId = req.user.id;
    return await this.matchService.registerForMatch(+matchId, userId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles([UserRole.PLAYER])
  @Put(':matchId/quit')
  async quit(@Param('matchId') matchId: string, @Req() req) {
    const userId = req.user.id;
    return await this.matchService.deregisterForMatch(+matchId, userId);
  }
}

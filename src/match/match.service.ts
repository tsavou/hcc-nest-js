import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  async create(createMatchDto: CreateMatchDto, userId: number): Promise<Match> {
    const user = await this.userService.findOne(userId);

    const newMatch = this.matchRepository.create({
      ...createMatchDto,
      createdBy: user,
    });

    return await this.matchRepository.save(newMatch);
  }

  async findAll(): Promise<Match[]> {
    return await this.matchRepository.find({
      relations: ['players'],
    });
  }

  async findOne(id: number): Promise<Match> {
    const match = await this.matchRepository.findOne({
      where: { id: id },
      relations: ['players'],
    });

    if (!match) {
      throw new NotFoundException(`Match with id: ${id} does not exist`);
    }
    return match;
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    const match = await this.findOne(id);
    await this.matchRepository.update(match.id, updateMatchDto);

    return `Match with id: ${match.id} updated successfully.`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}

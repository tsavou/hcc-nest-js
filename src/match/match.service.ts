import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    const existingMatch = await this.matchRepository.findOne({
      where: { date: new Date(createMatchDto.date) },
    });

    if (existingMatch) {
      throw new ConflictException(
        `A match is already scheduled on ${new Date(createMatchDto.date).toLocaleDateString()}.`,
      );
    }

    const newMatch = this.matchRepository.create({
      ...createMatchDto,
      createdBy: user,
    });

    return await this.matchRepository.save(newMatch);
  }

  async findAll(): Promise<Match[]> {
    return await this.matchRepository.find({
      relations: ['players', 'createdBy'],
    });
  }

  async findOne(id: number): Promise<Match> {
    const match = await this.matchRepository.findOne({
      where: { id: id },
      relations: ['players', 'createdBy'],
    });

    if (!match) {
      throw new NotFoundException(`Match with id: ${id} does not exist`);
    }
    return match;
  }

  async update(id: number, updateMatchDto: UpdateMatchDto): Promise<string> {
    const match = await this.findOne(id);
    await this.matchRepository.update(match.id, updateMatchDto);

    return `Match with id: ${match.id} updated successfully.`;
  }

  async registerForMatch(matchId: number, userId: number): Promise<object> {
    const user = await this.userService.findOne(userId);
    const match = await this.findOne(matchId);

    const isAlreadyRegistered = match.players.some(
      (player) => player.id === user.id,
    );
    if (isAlreadyRegistered) {
      throw new ConflictException(`You're already registered for this match.`);
    }

    match.players.push(user);

    await this.matchRepository.save(match);

    return {
      message: `You have successfully registered for the match against ${match.adversary}, which will take place on ${new Date(match.date).toLocaleDateString()}.`,
      players: match.players,
    };
  }

  async deregisterForMatch(matchId: number, userId: number): Promise<object> {
    const user = await this.userService.findOne(userId);
    const match = await this.findOne(matchId);

    const isRegistered = match.players.some((player) => player.id === user.id);
    if (!isRegistered) {
      throw new ConflictException(`You're not registered for this match.`);
    }

    match.players = match.players.filter((player) => player.id !== user.id);

    await this.matchRepository.save(match);

    return {
      message: `You have successfully deregistered for the match against ${match.adversary}, which will take place on ${new Date(match.date).toLocaleDateString()}.`,
      players: match.players,
    };
  }
}

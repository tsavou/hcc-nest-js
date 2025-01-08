import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<any> {
    return await this.userRepository.find();
  }

  async findOne(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with id: ${userId} does not exist`);
    }
    return user;
  }

  //funcntion pour valider un compte et lui attribuer un role
  async validateAccount(userId: number, role: UserRole): Promise<any> {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException(
        `Unable to validate: user with id: ${userId} does not exist`,
      );
    }

    if (!role) {
      throw new BadRequestException(
        `Role is required and must be a valid value ${role}`,
      );
    }

    user.role = role;
    user.isValidated = true;

    await this.userRepository.save(user);

    return `User ${user.firstName} ${user.lastName} is now validated with the role ${user.role}`;
  }

  /* update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }*/

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

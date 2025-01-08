import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
  ) {}

  async register(UserData: CreateUserDto): Promise<UserEntity> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(UserData.password, saltRounds);
    const newUser = this.authRepository.create({
      ...UserData,
      password: hash,
    });

    return this.authRepository.save(newUser);
  }

  async login(UserData: LoginDto) {
    const user = await this.authRepository.findOne({
      where: {
        email: UserData.email,
      },
    });

    const isAuthenticated = await bcrypt.compare(
      UserData.password,
      user.password,
    );

    if (isAuthenticated) {
      const secret = this.configService.get<string>('JWT_SECRET');
      const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN');
      const token = this.jwtService.sign(
        {
          email: user.email,
          role: user.role,
        },
        {
          secret,
          expiresIn,
        },
      );

      return {
        message: "You're Logged in",
        role: user.role,
        access_token: token,
      };
    }

    return;
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from '../user/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }
}

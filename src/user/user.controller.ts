import { Controller, Get, Param, UseGuards, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity, UserRole } from './entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string) {
    return await this.userService.findOne(Number(id));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['admin'])
  @Put('validate/:id')
  async validateUser(@Param('id') id: string, @Body('role') role: UserRole) {
    return await this.userService.validateAccount(Number(id), role);
  }
}

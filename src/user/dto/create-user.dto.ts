import {
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export enum UserRole {
  COACH = 'coach',
  CONTRIBUTOR = 'contributeur',
  PLAYER = 'joueur',
  ADMIN = 'admin',
}

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsBoolean()
  @IsOptional()
  isValidated?: boolean;
}

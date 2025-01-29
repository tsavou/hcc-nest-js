import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}

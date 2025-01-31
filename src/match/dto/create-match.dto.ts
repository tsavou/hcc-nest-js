import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMatchDto {
  @IsString()
  @IsNotEmpty()
  adversary: string;

  @IsString()
  @IsOptional()
  score: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsNotEmpty()
  createdBy: number;
}

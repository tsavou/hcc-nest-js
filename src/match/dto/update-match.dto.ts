import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMatchDto {
  @IsString()
  @IsOptional()
  adversary?: string;

  @IsString()
  @IsOptional()
  score?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date;
}

import { Type } from 'class-transformer';
import { IsInt, IsDate, Min, IsOptional, IsUUID } from 'class-validator';

export class GetAttendanceFilterDto {
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  fromDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  toDate?: Date;

  @IsUUID()
  @IsOptional()
  churchId?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  minAttendance?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  maxAttendance?: number;
}

import { Type } from 'class-transformer';
import { IsDate, IsInt, IsUUID, Min } from 'class-validator';

export class CreateAttendanceDto {
  @IsUUID()
  churchId: string;

  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsInt()
  @Min(0)
  attendance: number;
}

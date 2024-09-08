import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, Min, Validate } from 'class-validator';
import { ChurchExistsValidation } from 'src/modules/attendance/validation/church-exists.validation';

export class UpdateAttendaceDto {
  @Validate(ChurchExistsValidation)
  @IsOptional()
  churchId?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  attendance?: number;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date;
}

import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class UpdateChurchDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @Length(3, 65)
  name: string;
}

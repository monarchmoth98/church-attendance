import { IsNotEmpty, Length } from 'class-validator';
import { NewChurch } from 'src/modules/drizzle/entities/church.entity';

export class CreateChurchDto implements NewChurch {
  @IsNotEmpty()
  @Length(3, 65)
  name: string;
}

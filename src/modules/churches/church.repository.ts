import { DrizzleService } from 'src/modules/drizzle/drizzle.service';
import {
  churchesTable,
  Church,
} from 'src/modules/drizzle/entities/church.entity';
import { eq } from 'drizzle-orm';
import { CreateChurchDto } from 'src/modules/churches/dto/create-church.dto';
import { UpdateChurchDto } from 'src/modules/churches/dto/update-church.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ChurchRepository {
  table = churchesTable;
  constructor(private readonly drizzle: DrizzleService) {}

  async insertNewChurch(dto: CreateChurchDto): Promise<void> {
    if (!this.drizzle) {
      throw new InternalServerErrorException('No DB found!');
    }
    const result = await this.drizzle.db.insert(this.table).values(dto);
    console.log('Successfully Created new church', {
      result,
      where: 'Church Repository',
      level: 'INFO',
    });

    return;
  }

  async getAllChurches(): Promise<Church[]> {
    return await this.drizzle.db.select().from(this.table);
  }

  async getChurchById(id: string): Promise<Church | undefined> {
    const results = await this.drizzle.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id));

    return results.at(0) ?? undefined;
  }

  async updateChurchById(updateChurchDto: UpdateChurchDto): Promise<void> {
    const result = await this.drizzle.db
      .update(this.table)
      .set({ name: updateChurchDto.name })
      .where(eq(this.table.id, updateChurchDto.id));

    console.log(`Successfully Updated church ${updateChurchDto.id}`, {
      result,
      where: 'Church Repository',
      level: 'INFO',
    });

    return;
  }

  async deleteChurch(id: string): Promise<void> {
    const result = await this.drizzle.db
      .delete(this.table)
      .where(eq(this.table.id, id));

    console.log('Successfully Deleted church', {
      result,
      where: 'Church Repository',
      level: 'INFO',
    });

    return;
  }
}

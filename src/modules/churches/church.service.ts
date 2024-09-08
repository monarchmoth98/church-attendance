import { Injectable } from '@nestjs/common';
import { CreateChurchDto } from 'src/modules/churches/dto/create-church.dto';
import { ChurchRepository } from 'src/modules/churches/church.repository';
import { Church } from 'src/modules/drizzle/entities/church.entity';
import { UpdateChurchDto } from './dto/update-church.dto';

@Injectable()
export class ChurchService {
  constructor(private churchRepo: ChurchRepository) {}

  async createChurch(createChurchDto: CreateChurchDto): Promise<void> {
    createChurchDto;
    return await this.churchRepo.insertNewChurch(createChurchDto);
  }

  async findAllChurches(): Promise<Church[]> {
    return await this.churchRepo.getAllChurches();
  }

  async findChurchById(id: string): Promise<Church | undefined> {
    return await this.churchRepo.getChurchById(id);
  }

  async updateChurchById(dto: UpdateChurchDto) {
    return await this.churchRepo.updateChurchById(dto);
  }

  async deleteChurch(id: string): Promise<void> {
    return this.churchRepo.deleteChurch(id);
  }
}

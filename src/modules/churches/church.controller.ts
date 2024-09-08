import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  ParseUUIDPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ChurchService } from './church.service';
import { CreateChurchDto } from 'src/modules/churches/dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';

@Controller('church')
export class ChurchController {
  constructor(private readonly churchService: ChurchService) {}

  @Post()
  async create(@Body() createChurchDto: CreateChurchDto) {
    return await this.churchService.createChurch(createChurchDto);
  }

  @Get()
  async findAll() {
    return await this.churchService.findAllChurches();
  }

  @Get('/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const church = await this.churchService.findChurchById(id);
    if (!church) {
      throw new NotFoundException('Church not found');
    }
    return church;
  }

  @Patch(':id/name')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('name') name: string,
  ) {
    const updateChurchDto: UpdateChurchDto = {
      id: id,
      name: name,
    };
    return await this.churchService.updateChurchById(updateChurchDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.churchService.deleteChurch(id);
    } catch (err) {
      console.log('Cannot delete a Church that has records against it!', {
        err,
        level: 'ERROR',
      });
      throw new BadRequestException(
        "Can't delete a church that has records attached to it",
      );
    }
  }
}

import { Module } from '@nestjs/common';
import { ChurchService } from './church.service';
import { ChurchController } from './church.controller';
import { ChurchRepository } from 'src/modules/churches/church.repository';

@Module({
  controllers: [ChurchController],
  providers: [ChurchService, ChurchRepository],
  exports: [ChurchService],
})
export class ChurchModule {}

import { Module } from '@nestjs/common';
import { AttendanceService } from './attendace.service';
import { AttendanceController } from './attendace.controller';
import { ChurchExistsValidation } from './validation/church-exists.validation';
import { ChurchModule } from '../churches/church.module';
import { AttendanceRepository } from 'src/modules/attendance/attendance.repository';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceRepository, ChurchExistsValidation],
  imports: [ChurchModule],
})
export class AttendaceModule {}

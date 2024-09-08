import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { AttendanceService } from './attendace.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendaceDto } from './dto/update-attendance.dto';
import { GetAttendanceFilterDto } from './dto/get-attendance-filter.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    console.log('Passed Validation');
    console.log('Date value is: ' + createAttendanceDto.date);
    if (createAttendanceDto.date.getDay()) {
      console.log('Is a Date');
    }
    return await this.attendanceService.createAttendanceRecord(
      createAttendanceDto,
    );
  }

  @Get('')
  async GetAttendance(@Query() filterDto: GetAttendanceFilterDto) {
    if (Object.keys(filterDto).length) {
      return await this.attendanceService.getAttendanceRecordsWithFilters(
        filterDto,
      );
    }

    return await this.attendanceService.getAllAttendanceRecords();
  }

  @Put('/:id')
  async updateAttendanceRecord(
    @Param('id') id: string,
    @Body() updateAttendaceDto: UpdateAttendaceDto,
  ) {
    return await this.attendanceService.updateAttendanceRecordById(
      id,
      updateAttendaceDto,
    );
  }

  @Patch('/:id/attendance')
  async updateAttendanceOnAttendanceRecord(
    @Param('id') id: string,
    @Body('attendance') attendance: number,
  ) {
    return await this.attendanceService.updateAttendanceOnAttendanceRecord(
      id,
      attendance,
    );
  }

  @Patch('/:id/church')
  async updateChurchOnAttendanceRecord(
    @Param('id') id: string,
    @Body('churchId') churchId: string,
  ) {
    return await this.attendanceService.updateChurchOnAttendanceRecord(
      id,
      churchId,
    );
  }

  @Patch('/:id/date')
  async updateDateOnAttendanceRecord(
    @Param('id') id: string,
    @Body('date') date: Date,
  ) {
    return await this.attendanceService.updateDateOnAttendanceRecord(id, date);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.attendanceService.deleteAttendanceRecordById(id);
  }
}

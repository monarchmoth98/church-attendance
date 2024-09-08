import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendaceDto } from './dto/update-attendance.dto';
import { GetAttendanceFilterDto } from './dto/get-attendance-filter.dto';
import { AttendanceRepository } from 'src/modules/attendance/attendance.repository';
import { Attendance } from 'src/modules/drizzle/entities/attendance-record.entity';

@Injectable()
export class AttendanceService {
  constructor(private readonly attendanceRepo: AttendanceRepository) {}

  async createAttendanceRecord(
    createAttendaceDto: CreateAttendanceDto,
  ): Promise<void> {
    console.log('reached Service');
    return await this.attendanceRepo.insertNewAttendanceRecord(
      createAttendaceDto,
    );
  }

  async getAllAttendanceRecords(): Promise<Attendance[]> {
    return await this.attendanceRepo.getAllAttendanceRecords();
  }

  async getAttendanceRecordsWithFilters(
    filter: GetAttendanceFilterDto,
  ): Promise<Attendance[]> {
    const filteredRecords =
      await this.attendanceRepo.getAllAttendanceRecords(filter);
    console.log(filteredRecords);

    return filteredRecords;
  }

  /**
   * Used to update all data on an attendance record in one go.
   * @param id The Id of the record being updated.
   * @param updateAttendaceDto The DTO containing new updated values for the record.
   * @returns void
   */
  async updateAttendanceRecordById(
    id: string,
    updateAttendaceDto: UpdateAttendaceDto,
  ) {
    return await this.attendanceRepo.updateAttendanceRecord(
      id,
      updateAttendaceDto,
    );
  }

  async updateAttendanceOnAttendanceRecord(id: string, attendance: number) {
    const updateAttendanceDto: UpdateAttendaceDto = {
      attendance: attendance,
    };

    return await this.attendanceRepo.updateAttendanceRecord(
      id,
      updateAttendanceDto,
    );
  }

  async updateDateOnAttendanceRecord(id: string, date: Date) {
    const updateAttendanceDto: UpdateAttendaceDto = {
      date: date,
    };

    return await this.attendanceRepo.updateAttendanceRecord(
      id,
      updateAttendanceDto,
    );
  }

  async updateChurchOnAttendanceRecord(id: string, churchId: string) {
    const updateAttendanceDto: UpdateAttendaceDto = {
      churchId: churchId,
    };

    return await this.attendanceRepo.updateAttendanceRecord(
      id,
      updateAttendanceDto,
    );
  }

  async deleteAttendanceRecordById(id: string) {
    return await this.attendanceRepo.deleteAttendance(id);
  }
}

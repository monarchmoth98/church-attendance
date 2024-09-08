import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { CreateAttendanceDto } from 'src/modules/attendance/dto/create-attendance.dto';
import {
  Attendance,
  attendanceTable,
} from '../drizzle/entities/attendance-record.entity';
import { and, eq, gte, lt, SQL } from 'drizzle-orm';
import { UpdateAttendaceDto } from 'src/modules/attendance/dto/update-attendance.dto';
import { GetAttendanceFilterDto } from './dto/get-attendance-filter.dto';

@Injectable()
export class AttendanceRepository {
  table = attendanceTable;
  constructor(private readonly drizzle: DrizzleService) {}

  async insertNewAttendanceRecord(dto: CreateAttendanceDto): Promise<void> {
    console.log('Reached Repo Layer');
    const result = await this.drizzle.db.insert(this.table).values(dto);
    console.log('Successfully Created new attendance record', {
      result,
      where: 'Attendance Repository',
      level: 'INFO',
    });
    return;
  }

  async getAllAttendanceRecords(
    filter: GetAttendanceFilterDto = null,
  ): Promise<Attendance[]> {
    const { churchId, date, fromDate, toDate, maxAttendance, minAttendance } =
      filter;

    const drizzleFilter: SQL[] = [];
    if (churchId !== undefined)
      drizzleFilter.push(eq(this.table.churchId, churchId));

    if (date !== undefined) drizzleFilter.push(eq(this.table.date, date));

    if (fromDate !== undefined)
      drizzleFilter.push(gte(this.table.date, fromDate));

    if (toDate !== undefined) drizzleFilter.push(lt(this.table.date, toDate));

    if (minAttendance !== undefined)
      drizzleFilter.push(gte(this.table.attendance, minAttendance));

    if (maxAttendance !== undefined)
      drizzleFilter.push(lt(this.table.attendance, maxAttendance));

    return await this.drizzle.db
      .select()
      .from(this.table)
      .where(and(...drizzleFilter));
  }

  async updateAttendanceRecord(
    id: string,
    updateDto: UpdateAttendaceDto,
  ): Promise<void> {
    const result = this.drizzle.db
      .update(this.table)
      .set(updateDto)
      .where(eq(this.table.id, id));
    console.log('Successfully Updated attendance record', {
      result,
      where: 'Attendance Repository',
      level: 'INFO',
    });
  }

  async deleteAttendance(id: string) {
    const result = await this.drizzle.db
      .delete(this.table)
      .where(eq(this.table.id, id));
    console.log('Successfully Deleted attendance record', {
      result,
      where: 'Attendance Repository',
      level: 'INFO',
    });
  }
}

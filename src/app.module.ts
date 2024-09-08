import { Module } from '@nestjs/common';
import { ChurchModule } from './modules/churches/church.module';
import { AttendaceModule } from './modules/attendance/attendace.module';
import { DrizzleModule } from './modules/drizzle/drizzle.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ChurchModule, AttendaceModule, DrizzleModule, AuthModule],
  controllers: [],
})
export class AppModule {}

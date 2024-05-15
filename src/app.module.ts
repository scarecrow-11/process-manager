import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProcessModule } from './process/process.module'

@Module({
  imports: [ScheduleModule.forRoot(), ProcessModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

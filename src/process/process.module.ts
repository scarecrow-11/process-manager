import { Module } from '@nestjs/common'
import { ProcessService } from './process.service'
import { ProcessController } from './process.controller'
import { PrismaModule } from '../shared/services/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [ProcessService],
  controllers: [ProcessController]
})
export class ProcessModule {}

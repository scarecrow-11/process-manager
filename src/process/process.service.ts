import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { SchedulerRegistry, CronExpression } from '@nestjs/schedule'
import { nanoid } from 'nanoid'
import { CronJob } from 'cron'
import { Process } from '@prisma/client'
import { PrismaService } from '../shared/services/prisma/prisma.service'
import { DeleteProcessDto } from './dto/delete-process.dto'

@Injectable()
export class ProcessService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly schedulerRegistry: SchedulerRegistry
    ) {}

    async create() {
        // Create Process
        const pid = nanoid()
        const process = await this.prismaService.process.create({
            data: {
                pid,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        // Create Process Cron Job
        await this.createProcessCronJob(process, CronExpression.EVERY_5_SECONDS)

        return process
    }

    async delete(deleteProcessDto: DeleteProcessDto) {
        const { pid } = deleteProcessDto

        const process = await this.prismaService.process.findUnique({
            where: {
                pid
            }
        })
        if (!process) {
            throw new HttpException('Process not found.', HttpStatus.NOT_FOUND)
        }

        // Kill Process Cron Job
        this.killProcessCronJob(pid)
        await this.prismaService.process.delete({
            where: {
                pid
            }
        })

        return {
            message: `'${pid}' The process has been successfully deleted.`
        }
    }

    private async createProcessCronJob(process: Process, schedule: string) {
        try {
            const job = new CronJob(schedule, async () => {
                await this.prismaService.processLog.create({
                    data: {
                        message: new Date().toUTCString(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        process: {
                            connect: {
                                id: process.id
                            }
                        }
                    }
                })
            })
            this.schedulerRegistry.addCronJob(process.pid, job)
            const cronJob = this.schedulerRegistry.getCronJob(process.pid)
            if (cronJob) {
                cronJob.start()
            }
        } catch (e) {
            // Rollback Process Cron Job and Process Creation
            this.killProcessCronJob(process.pid)
            await this.prismaService.process.delete({
                where: {
                    id: process.id
                }
            })

            throw e
        }
    }

    private killProcessCronJob(pid: string) {
        const cronJob = this.schedulerRegistry.getCronJob(pid)
        if (cronJob) {
            cronJob.stop()
            this.schedulerRegistry.deleteCronJob(pid)
        }
    }
}

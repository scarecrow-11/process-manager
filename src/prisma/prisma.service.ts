import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        try {
            console.log('Connecting to database...')
            await this.$connect()
            console.log('Successfully connected to database.')
        } catch (e) {
            console.error(e)
        }
    }
    
    async onModuleDestroy() {
        try {
            console.log('Disconnecting from database...')
            await this.$disconnect()
        } catch (e) {
            console.error(e)
        }
    }
}

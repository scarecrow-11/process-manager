import { Controller, Query, Post, Delete } from '@nestjs/common'
import { ProcessService } from './process.service'
import { DeleteProcessDto } from './dto/delete-process.dto'

@Controller()
export class ProcessController {
    constructor(private readonly processService: ProcessService) {}

    @Post('/create-process')
    async create() {
        return await this.processService.create()
    }

    @Delete('/delete-process')
    async delete(@Query() deleteProcessDto: DeleteProcessDto) {
        return await this.processService.delete(deleteProcessDto)
    }
}

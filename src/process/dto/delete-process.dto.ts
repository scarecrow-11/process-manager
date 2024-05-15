import { IsString } from 'class-validator'

export class DeleteProcessDto {
    @IsString()
    pid: string
}

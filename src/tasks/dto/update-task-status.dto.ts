import { IsEnum } from 'class-validator';
import { Status } from '../task-status.enum';

export class UpdateTaskStatusDto {
    @IsEnum(Status)
    status: Status;
}

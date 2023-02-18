import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from '../task-status.enum';

export class ReadManyFilter {
    @IsOptional()
    @IsEnum(Status)
    status?: Status;

    @IsOptional()
    @IsString()
    q?: string;
}

import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReadManyFilter } from './dto/read-many-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksServices: TasksService) {}

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.tasksServices.create(createTaskDto);
    }

    @Get('/:id')
    async read(@Param('id') id: string): Promise<Task> {
        const task = await this.tasksServices.read(id);
        if (task) return task;
        throw new NotFoundException();
    }

    @Get()
    async readMany(@Query() filter: ReadManyFilter): Promise<Task[]> {
        return this.tasksServices.readMany(filter);
    }

    @Patch('/:id/status')
    async update(@Param('id') id: string, @Body() dto: UpdateTaskStatusDto) {
        const { status } = dto;
        return await this.tasksServices.update(id, status);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.tasksServices.delete(id);
    }
}

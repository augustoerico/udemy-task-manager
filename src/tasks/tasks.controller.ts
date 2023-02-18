import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
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

    // @Get()
    // readMany(): Task[] {
    //     return this.tasksServices.readMany();
    // }

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

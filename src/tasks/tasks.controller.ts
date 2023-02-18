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
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReadManyFilter } from './dto/read-many-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksServices: TasksService) {}

    @Post()
    async create(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        return await this.tasksServices.create(createTaskDto, user);
    }

    @Get('/:id')
    async read(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        const task = await this.tasksServices.read(id, user);
        if (task) return task;
        throw new NotFoundException();
    }

    @Get()
    async readMany(
        @Query() filter: ReadManyFilter,
        @GetUser() user,
    ): Promise<Task[]> {
        return this.tasksServices.readMany(filter, user);
    }

    @Patch('/:id/status')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateTaskStatusDto,
        @GetUser() user: User,
    ) {
        const { status } = dto;
        return await this.tasksServices.update(id, status, user);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string, @GetUser() user): Promise<void> {
        await this.tasksServices.delete(id, user);
    }
}

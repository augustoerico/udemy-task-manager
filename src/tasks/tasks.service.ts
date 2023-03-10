import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Status } from './task-status.enum';
import { ReadManyFilter } from './dto/read-many-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private repository: TasksRepository,
    ) {}

    async create(dto: CreateTaskDto, user: User): Promise<Task> {
        return this.repository.insertTask(dto, user);
    }

    async read(id: string, user: User): Promise<Task> {
        const task = await this.repository.findOne({ id, user });
        if (task) return task;
        throw new NotFoundException(`Task with id = ${id} was not found`);
    }

    async readMany(filter: ReadManyFilter, user: User): Promise<Task[]> {
        return this.repository.fetchManyTasks(filter, user);
    }

    async update(id: string, status: Status, user: User) {
        const task = await this.read(id, user);
        task.status = status;
        this.repository.save(task);
        return task;
    }

    async delete(id: string, user: User) {
        const task = await this.read(id, user);
        return this.repository.remove([task]);
    }
}

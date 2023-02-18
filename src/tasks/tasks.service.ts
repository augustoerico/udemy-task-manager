import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Status } from './task-status.enum';
import { ReadManyFilter } from './dto/read-many-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private repository: TasksRepository,
    ) {}

    async create(dto: CreateTaskDto, user: User): Promise<Task> {
        return this.repository.insertTask(dto, user);
    }

    async read(id: string): Promise<Task> {
        return this.repository.findOne({ id });
    }

    async readMany(filter: ReadManyFilter, user: User): Promise<Task[]> {
        return this.repository.fetchManyTasks(filter, user);
    }

    async update(id: string, status: Status) {
        const task = await this.read(id);
        if (task) {
            task.status = status;
            this.repository.save(task);
            return task;
        }
        throw new NotFoundException();
    }

    async delete(id: string) {
        const task = await this.read(id);
        if (task) return this.repository.remove([task]);
        throw new NotFoundException();
    }
}

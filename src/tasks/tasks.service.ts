import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Status } from './task-status.enum';
import { ReadManyFilter } from './dto/read-many-filter.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private repository: TasksRepository,
    ) {}

    async create(dto: CreateTaskDto): Promise<Task> {
        return this.repository.insertTask(dto);
    }

    async read(id: string): Promise<Task> {
        return this.repository.findOne({ id });
    }

    async readMany(filter: ReadManyFilter): Promise<Task[]> {
        return this.repository.fetchManyTasks(filter);
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

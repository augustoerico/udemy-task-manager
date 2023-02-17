import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Status } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private repository: TasksRepository,
    ) {}

    async create(dto: CreateTaskDto): Promise<Task> {
        const { title, description } = dto;
        const task = this.repository.create({
            title,
            description,
            status: Status.OPEN,
        });
        await this.repository.save(task);
        return task;
    }

    async read(id: string): Promise<Task> {
        return this.repository.findOneBy({ id });
    }

    // readMany(): Task[] {
    //     return this.tasks;
    // }

    // update(id: string, status: Status) {
    //     const task = this.read(id);
    //     if (task) {
    //         task.status = status;
    //     }
    //     return task;
    // }

    // delete(id: string) {
    //     this.tasks = this.tasks.filter((task) => task.id !== id);
    // }
}

import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

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

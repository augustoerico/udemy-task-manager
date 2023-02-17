import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Status } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    async insertTask(dto: CreateTaskDto) {
        const { title, description } = dto;
        const task = this.create({
            title,
            description,
            status: Status.OPEN,
        });
        await this.save(task);
        return task;
    }
}

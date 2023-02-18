import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { ReadManyFilter } from './dto/read-many-filter.dto';
import { Status } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    async fetchManyTasks(filter: ReadManyFilter) {
        const query = this.createQueryBuilder('task');
        const { status, q } = filter;
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (q) {
            query.andWhere(
                'LOWER(task.title) LIKE :q OR LOWER(task.description) LIKE :q',
                { q: `%${q.toLowerCase()}%` },
            );
        }
        return query.getMany();
    }

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

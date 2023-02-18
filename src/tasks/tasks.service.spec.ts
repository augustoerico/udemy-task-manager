import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
    fetchManyTasks: jest.fn(),
});

const mockUser = {
    id: 'some-id',
    username: 'user',
    password: 'password',
    tasks: [],
};

describe('TasksService', () => {
    let tasksServices: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TasksRepository, useFactory: mockTasksRepository },
            ],
        }).compile();
        tasksServices = module.get(TasksService);
        tasksRepository = module.get(TasksRepository);
    });

    describe('readMany', () => {
        it('should invoke TasksRepository.fetchManyTasks', async () => {
            // mock
            tasksRepository.fetchManyTasks.mockResolvedValue([]);

            // when
            const tasks = await tasksServices.readMany(null, mockUser);

            // then
            expect(tasksRepository.fetchManyTasks).toHaveBeenCalledWith(
                null,
                mockUser,
            );
            expect(tasks).toEqual([]);
        });
    });
});

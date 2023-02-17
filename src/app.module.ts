import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TasksModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 32768,
            username: 'postgres',
            password: 'postgrespw',
            database: 'task-manager',
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

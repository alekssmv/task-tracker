import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { TaskController } from './controllers/task.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task_tracker',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController, TaskController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

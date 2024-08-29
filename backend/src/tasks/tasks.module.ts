import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  controllers: [TasksController],
  providers: [TasksService, UsersService]
})
export class TasksModule {}

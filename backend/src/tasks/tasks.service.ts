import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { TaskAdminDto } from './dto/task.admin.dto';
import { TaskAssigneeDto } from './dto/task.assignee.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }

    async find(options: FindOneOptions<Task>): Promise<Task[]> {
        const tasks = await this.tasksRepository.find(options);
        return this.tasksRepository.find(options);
    }

    async findOne(options: FindOneOptions<Task>): Promise<Task> {
        return this.tasksRepository.findOne(options);
    }

    async create(admin: User, assignee: User, taskDto: TaskAdminDto): Promise<Task> {
        const task = new Task();
        task.title = taskDto.title;
        task.description = taskDto.description;
        task.deadline = taskDto.deadline;
        task.status = 'Создана';
        task.progress = '0%';
        task.type = taskDto.type;
        task.assignee = assignee;
        task.assignee_name = assignee.name;
        task.admin = admin;
        return this.tasksRepository.save(task);
    }

    async update(task: Task, taskDto: Record<string, any>, assignee?: User): Promise<Task> {
        task.title = taskDto.title ?? task.title;
        task.description = taskDto.description ?? task.description;
        task.assignee = assignee ?? task.assignee;
        task.deadline = taskDto.deadline ?? task.deadline;
        task.type = taskDto.type ?? task.type;
        task.progress = taskDto.progress ?? task.progress;
        task.status = taskDto.status ?? task.status;
        task.updated = new Date();
        return this.tasksRepository.save(task);
    }

    async updateProgressStatus(task: Task, taskAssigneeDto: TaskAssigneeDto): Promise<Task> {
        task.progress = taskAssigneeDto.progress ?? task.progress;
        task.status = taskAssigneeDto.status ?? task.status;
        task.updated = new Date();
        return this.tasksRepository.save(task);
    }

    async delete(task: Task): Promise<void> {
        await this.tasksRepository.remove(task);
    }
}

import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Roles } from 'src/roles/roles.decorator';
import { TaskAdminDto } from './dto/task.admin.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UsersService } from 'src/users/users.service';
import { TaskAssigneeDto } from './dto/task.assignee.dto';

@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TasksService,
        private usersService: UsersService
    ) { }

    /**
     * Эндпоинты для администратора.
     */

    /**
     * Получение всех задач, созданных админом.
     * @param request 
     * @returns 
     */
    @Roles(['admin'])
    @Get('admin')
    async adminTasks(@Request() request: any, @Query() querry: any) {
        const id = Number(request.user.id);

        // Если нет сортировки.
        let tasks = null;
        if (!querry.sort_by) {
            const tasks = await this.tasksService.findAdminTasks(id);
            return {
                success: true,
                data: tasks,
            }
        }
    }

    /**
     * Создание задачи администратором.
     * @param request 
     * @param requestData 
     * @returns 
     */
    @Roles(['admin'])
    @Post('admin')
    async createTask(
        @Request() request: any,
        @Body() requestData: any) {

        // Валидация DTO.
        const taskDto = plainToClass(TaskAdminDto, requestData);
        await validate(taskDto).then(errors => {
            if (errors.length > 0) {
                throw new BadRequestException('Не переданы все обязательные поля.');
            }
        });

        // Проверка, что есть assignee с таким id.
        const assigneeId = taskDto.assignee_id;
        const assignee = await this.usersService.findOne(
            { where: { id: assigneeId, roles: 'assignee' } });
        if (!assignee) {
            throw new BadRequestException('Assignee not found.');
        }

        const adminId = Number(request.user.id);
        const admin = await this.usersService.findOne(
            { where: { id: adminId, roles: 'admin' } });

        // Создаем задачу.
        const task = await this.tasksService.create(admin, assignee, taskDto);

        return {
            success: true,
            message: 'Задача создана',
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                assignee: {
                    id: task.assignee.id,
                    login: task.assignee.login,
                },
                type: task.type,
                progress: task.progress,
                status: task.status,
                created: task.created,
            },
        };
    }

    /**
     * Получение задачи администратора по id.
     * @param request 
     * @param taskId 
     * @returns 
     */
    @Roles(['admin'])
    @Get('admin/:id')
    async getTask(
        @Request() request: any,
        @Param('id') taskId: number
    ) {
        // Пытаемся найти задачу, которая принадлежит админу.
        const adminId = Number(request.user.id);
        const task = await this.tasksService.findOne({
            where:
                { admin: { id: adminId }, id: taskId }
        });

        if (!task) {
            throw new BadRequestException('Задача не найдена или не достаточно прав.');
        }
        return task;
    }

    /**
     * Изменение задачи администратором.
     */
    @Roles(['admin'])
    @Put('admin/:id')
    async updateTask(
        @Request() request: any,
        @Param('id') taskId: number,
        @Body() requestData: any
    ) {
        // Пытаемся найти задачу, которая принадлежит админу.
        const adminId = Number(request.user.id);
        const task = await this.tasksService.findOne({
            where:
                { admin: { id: adminId }, id: taskId }
        });
        if (!task) {
            throw new BadRequestException('Задача не найдена или не достаточно прав.');
        }

        // Валидация DTO.
        const taskDto = plainToClass(TaskAdminDto, requestData);
        await validate(taskDto).then(errors => {
            if (errors.length > 0) {
                throw new BadRequestException('Не переданы все обязательные поля.');
            }
        });

        // Ищем assignee.
        const assigneeId = taskDto.assignee_id;
        const assignee = await this.usersService.findOne(
            { where: { id: assigneeId, roles: 'assignee' } });
        if (!assignee) {
            throw new BadRequestException('Assignee not found.');
        }

        // Изменяем задачу.
        const updatedTask = await this.tasksService.update(task, taskDto, assignee);
        return {
            message: 'Задача обновлена',
            success: true,
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                assignee: {
                    id: task.assignee.id,
                    login: task.assignee.login,
                },
                type: task.type,
                progress: task.progress,
                status: task.status,
                created: task.created
            },
        }
    }

    /**
     * Удаление задачи администратором.
     * @param request 
     * @param taskId 
     * @returns 
     */
    @Roles(['admin'])
    @Delete('admin/:id')
    async deleteTask(
        @Request() request: any,
        @Param('id') taskId: number
    ) {
        // Пытаемся найти задачу, которая принадлежит админу.
        const adminId = Number(request.user.id);
        const task = await this.tasksService.findOne({
            where:
                { admin: { id: adminId }, id: taskId }
        });
        if (!task) {
            throw new BadRequestException('Задача не найдена или не достаточно прав.');
        }
        await this.tasksService.delete(task);
        return {
            message: 'Задача удалена',
            success: true
        }
    }

    /**
    * Эндпоинты для assignee.
     */

    /**
     * Получение всех задач, назначенных пользователю.
     * @param request 
     * @returns 
     */
    @Roles(['assignee'])
    @Get('assignee')
    async assigneeTasks(@Request() request: any) {
        const id = Number(request.user.id);
        const tasks = await this.tasksService.findAssigneeTasks(id);
        return {
            message: 'Задачи получены',
            success: true,
            data: tasks
        }
    }

    @Roles(['assignee'])
    @Patch('assignee/:id')
    async updateAssigneeTask(
        @Request() request: any,
        @Param('id') taskId: number,
        @Body() taskAssigneeDto: TaskAssigneeDto
    ) {
        const id = Number(request.user.id);
        const task = await this.tasksService.findOne({ where: { assignee: { id }, id: taskId } });
        if (!task) {
            throw new BadRequestException('Задача не найдена или не достаточно прав.');
        }
        
        // Валидация DTO.
        await validate(taskAssigneeDto).then(errors => {
            if (errors.length > 0) {
                throw new BadRequestException('Не переданы все обязательные поля.');
            }
        });
        
        this.tasksService.updateProgressStatus(task, taskAssigneeDto);
        return {
            message: 'Статус задачи обновлен',
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                assignee: {
                    id: task.assignee.id,
                    login: task.assignee.login,
                },
                type: task.type,
                progress: task.progress,
                status: task.status,
                created: task.created
            },
            success: true
        }
    }

    /**
     * Получение задачи, 
     * назначенной пользователю.
     * @param request 
     * @param taskId
     * @returns 
     */
    @Roles(['assignee'])
    @Get('assignee/:id')
    async getAssigneeTask(
        @Request() request: any,
        @Param('id') taskId: number
    ) {
        const id = Number(request.user.id);
        const task = await this.tasksService.findOne({ where: { assignee: { id }, id: taskId } });
        if (!task) {
            throw new BadRequestException('Задача не найдена или не достаточно прав.');
        }
        return task;
    }
}
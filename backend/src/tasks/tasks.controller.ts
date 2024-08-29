import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Roles } from 'src/roles/roles.decorator';
import { TaskAdminDto } from './dto/task.admin.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UsersService } from 'src/users/users.service';
import { TaskFilterDto } from './task.filter.dto';
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
    adminTasks(@Request() request: any, @Query() querry: any) {
        const id = Number(request.user.id);
        if (!querry.sort_by) {
            return this.tasksService.find({ where: { admin: { id } } });
        }
        return this.tasksService.find(
            {
                where: { admin: { id } },
                order: { [querry.sort_by]: querry.sort_order ?? 'ASC' }
            });
    }

    /**
     * Фильтация задач администратора.
     * @param request 
     * @param taskFilterDto 
     * @returns 
     */
    @Roles(['admin'])
    @Get('admin/filter')
    adminTasksFilter(@Request() request: any, @Query() taskFilterDto: TaskFilterDto) {
        const assigneeId = taskFilterDto.assignee_id;
        // remove assignee_id from taskFilterDto
        delete taskFilterDto.assignee_id;
        const id = Number(request.user.id);
        return this.tasksService.find({
            where: {
                admin: { id },
                assignee: { id: assigneeId },
                ...taskFilterDto
            }
        });
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
        this.tasksService.create(admin, assignee, taskDto);

        return {
            message: 'Задача создана',
            success: true
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
    @Patch('admin/:id')
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
            console.debug(errors);
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
        this.tasksService.update(task, taskDto, assignee);
        return {
            message: 'Задача обновлена',
            success: true
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
    assigneeTasks(@Request() request: any) {
        const id = Number(request.user.id);
        return this.tasksService.find({ where: { assignee: { id } } });
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
            console.debug(errors);
            if (errors.length > 0) {
                throw new BadRequestException('Не переданы все обязательные поля.');
            }
        });

        this.tasksService.updateProgressStatus(task, taskAssigneeDto);

        return {
            message: 'Статус задачи обновлен',
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
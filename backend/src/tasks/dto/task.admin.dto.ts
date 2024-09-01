import { IsIn, IsNotEmpty } from "class-validator";
import { Task } from "../task.entity";

/**
 * Все поля обязательные кроме описания.
 */
export class TaskAdminDto {

    @IsNotEmpty()
    title: string;

    assignee_id: number;

    @IsNotEmpty()
    @IsIn(['Task', 'Epic', 'Milestone'])
    type: string;

    @IsNotEmpty()
    deadline: Date;

    created: Date;

    assignee_login: string;

    description: string;

    @IsIn(['Создана', 'В работе', 'Завершена', undefined])
    status: string;

    @IsIn([0, 25, 50, 75, 100, undefined])
    progress: number;

    fromEntityToDto(task) {
        this.title = task.title;
        this.assignee_id = task.assignee.id;
        this.assignee_login = task.assignee.login;
        this.type = task.type;
        this.deadline = task.deadline;
        this.created = task.created;
        this.description = task.description;
        this.status = task.status;
        this.progress = task.progress;
    }
}
import { IsIn, IsNotEmpty } from "class-validator";

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

    description: string;

    @IsIn(['Создана', 'В работе', 'Завершена', undefined])
    status: string;

    @IsIn(['0%', '25%', '50%', '75%', '100%', undefined])
    progress: string;
}
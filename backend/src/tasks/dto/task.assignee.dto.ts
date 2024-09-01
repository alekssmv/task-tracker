import { IsIn, IsNotEmpty } from "class-validator";

/**
 * Все поля обязательные кроме описания.
 */
export class TaskAssigneeDto {
    @IsNotEmpty()
    @IsIn([0, 25, 50, 75, 100, undefined])
    progress: number;

    @IsIn(['Завершена', undefined])
    status: string;
}
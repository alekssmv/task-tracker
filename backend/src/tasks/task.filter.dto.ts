import { Equals, IsIn, isNotEmpty, IsNotEmpty, NotEquals } from "class-validator";
import { Equal } from "typeorm";

/**
 * Все поля обязательные кроме описания.
 */
export class TaskFilterDto {

    assignee_id: number;

    type: string;

    status: string;

    created: Date;

    deadline: Date;
}
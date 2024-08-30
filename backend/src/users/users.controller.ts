import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get } from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    @Roles(['admin'])
    @Get('assignees')
    findAll() {
        return this.usersService.find({
            where: { roles: 'assignee' }
        })
    }
}

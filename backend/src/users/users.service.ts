import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneByOrFail({ login: username });
  }

  async create(signUpDto: Record<string, any>) {
    const user = this.usersRepository.create(signUpDto);
    return this.usersRepository.save(user);
  }
}
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(options: FindOneOptions<User>): Promise<User | undefined> {
    return this.usersRepository.findOne(options);
  }
  async create(signUpDto: Record<string, any>) {
    const user = this.usersRepository.create(signUpDto);
    return this.usersRepository.save(user);
  }
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { strict } from 'assert';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    login: string,
    pass: string,
    roles: string
  ): Promise<{ access_token: string, login: string, roles: string }> {
    const user = await this.usersService.findOne({ where: { login: login } });

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    if (user.roles !== roles) {
      throw new UnauthorizedException('Incorrect roles');
    }
    
    const payload = { id: user.id, login: user.login, name: user.name, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
      login: user.login,
      roles: user.roles
    };
  }

  async signUp(signUpDto: Record<string, any>) {
    return this.usersService.create(signUpDto);
  }
}
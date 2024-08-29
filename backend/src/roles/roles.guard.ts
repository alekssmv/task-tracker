import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ConsoleLogger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private jwtService: JwtService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    let payload: any;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      );
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return this.matchRoles(roles, payload.roles);
  }

  /**
   * If all roles that the user has are in the roles array, return true.
   * @param roles 
   * @param userRoles 
   * @returns 
   */
  private matchRoles(roles: string[], userRoles: string[]): boolean {
    return roles.some(role => userRoles.includes(role));
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers['authorization']
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
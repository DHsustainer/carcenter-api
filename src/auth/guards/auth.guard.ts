import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (!request)
      throw new HttpException(`Invalid Token`, HttpStatus.UNAUTHORIZED);

    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new HttpException('Token is missing', HttpStatus.UNAUTHORIZED);
    }
    const userToken = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
    try {
      request['user'] = userToken;
      return true;
    } catch (error) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers['authorization'];
    if (typeof authorizationHeader === 'string') {
      const [type, token] = authorizationHeader.split(' ');
      return type === 'Bearer' ? token : undefined;
    }
    return undefined;
  }
}
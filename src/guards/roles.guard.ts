import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'expectedRoles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const role = request.user.role;

    if (!role || !requiredRoles.includes(role)) {
      throw new ForbiddenException(
        `Access denied: you need to be ${requiredRoles.join(' or ')}`,
      );
    }

    return true;
  }
}

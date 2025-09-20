import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RiderRoleGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        if (req.user?.role !== 'rider') {
            throw new ForbiddenException('Only riders can perform this action');
        }
        return true;
    }
}

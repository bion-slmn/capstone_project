import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class ClientRoleGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        if (req.user?.role !== 'client') {
            throw new ForbiddenException('Only clients can perform this action');
        }
        return true;
    }
}

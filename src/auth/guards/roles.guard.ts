import { PUBLIC_KEY, LEVEL_AUTHORITY_KEY } from './../../constants/key-decorators';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from 'express';
import { Observable } from "rxjs";
import { LEVEL_AUTHORITY } from 'src/constants/level-authority';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get<boolean>(
            PUBLIC_KEY,
            context.getHandler()
        )

        if (isPublic) {
            return true;
        }

        const roles = this.reflector.get<Array<keyof typeof LEVEL_AUTHORITY>>(
            LEVEL_AUTHORITY_KEY,
            context.getHandler()
        )

        const req = context.switchToHttp().getRequest<Request>();
        const { roleUser } = req;

        if (roles && !roles.some((role) => role === roleUser)) {
            throw new UnauthorizedException('No tiene los permisos necesarios para esta operacion');
        }
        
        return true;
    }
}
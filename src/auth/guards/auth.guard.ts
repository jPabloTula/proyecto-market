import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PUBLIC_KEY } from "src/constants/key-decorators";
import { UsersService } from "src/users/services/users.service";
import { IUseToken } from "../interfaces/auth.interfaces";
import { userToken } from "src/utils/use.token";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly userService: UsersService,
        private readonly reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.get<boolean>(
            PUBLIC_KEY,
            context.getHandler()
        )

        if (isPublic) {
            return true;
        }

        const req = context.switchToHttp().getRequest<Request>();

        const token = req.headers['access_token'];

        if (!token || Array.isArray(token)) {
            throw new UnauthorizedException('Invalid token')
        }

        const manageToken: IUseToken | string = userToken(token);

        if (typeof manageToken === 'string') {
            throw new UnauthorizedException(manageToken)
        }

        if (manageToken.isExpired) {
            throw new UnauthorizedException('Token expired')
        }

        const { sub } = manageToken;

        const user = await this.userService.findUserById(sub);

        if (!user) {
            throw new UnauthorizedException('Invalid user')
        }

        req.idUser = user.id;
        req.roleUser = user.levelAuthority;

        return true;
    }
}
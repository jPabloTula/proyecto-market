import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from '../../users/entities/users.entity';
import { UsersService } from 'src/users/services/users.service';
import { PayloadToken } from '../interfaces/auth.interfaces';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService
    ) { }

    public async existUser(username: string) {
        const user = await this.userService.findBy({
            key: 'email',
            value: username
        });

        if(!user) {
            throw new ErrorManager({
                type: 'NOT_FOUND',
                message: 'El usuario no existe'
            })
        }

        return user;
    }

    public async validateUser(username: string, password: string) {
        const userByEmail = await this.userService.findBy({
            key: 'email',
            value: username
        });

        if(userByEmail) {
            const match = await bcrypt.compare(password, userByEmail.password);
            if (match) {
                return userByEmail;
            }
        }

        return null;
    }

    public signJWT({
        payload,
        secret,
        expires
    }: {
        payload: jwt.JwtPayload;
        secret: string;
        expires: number | string
    }) {
        return jwt.sign(payload, secret, {
            expiresIn: expires
        });
    }

    public async generateJWT(user: UsersEntity): Promise<any> {
        const getUser = await this.userService.findUserById(user.id);

        const payload: PayloadToken = {
            role: getUser.level_authority,
            sub: getUser.id
        }

        return {
            accessToken: this.signJWT({
                payload,
                secret: process.env.JWT_SECRET,
                expires: '1h'
            }),
            user,
        }
    }
}

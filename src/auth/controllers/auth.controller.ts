import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() { email, password }: AuthDTO) {
        const userValidate = await this.authService.validateUser(email, password);

        if (!userValidate) {
            throw new UnauthorizedException('Data not valid');
        }
        const jwt = await this.authService.generateJWT(userValidate);

        return jwt
    }
}

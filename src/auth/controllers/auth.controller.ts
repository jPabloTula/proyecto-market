import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    public async login(@Body() { email, password }: AuthDTO) {
        const user = await this.authService.existUser(email);

        if (!user) {
            throw new ErrorManager({
                type: 'NOT_FOUND',
                message: 'usuario no encontrado',
            })
        }
        
        const userValidate = await this.authService.validateUser(email, password);

        if (!userValidate) {
            throw new UnauthorizedException('Data not valid');
        }
        const jwt = await this.authService.generateJWT(userValidate);

        return jwt;
    }
}

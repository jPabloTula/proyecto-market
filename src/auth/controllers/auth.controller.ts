import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';
import { PublicAccess } from '../decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @PublicAccess()
    @ApiOperation({ 
        summary: 'Método para realizar login y poder autenticar al usuario',
        description: 'Se debe enviar el email y la contraseña en el body'
    })
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

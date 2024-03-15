import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserUpdateDTO } from '../dto/users.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @PublicAccess()
    @ApiOperation({ 
        summary: 'Método para crear usuario',
        description: 'Los valores se deben cargar en el body'
    })
    @Post()
    public async registerUser(@Body() body: UserDTO) {
        return await this.usersService.createUser(body);
    }

    @Roles('ADMIN')
    @ApiHeader({
        name: 'access_token',
    })
    @ApiOperation({ 
        summary: 'Método para listar todos los usuarios'
    })
    @Get()
    public async findAllUsers() {
        return await this.usersService.findUsers();
    }

    @Roles('ADMIN')
    @ApiHeader({
        name: 'access_token',
    })
    @ApiParam({ name: 'user_id' })
    @ApiOperation({ 
        summary: 'Método para obtener los datos de un usuario'
    })
    @Get('/:user_id')
    public async findUserById(@Param('user_id') id: string) {
        return await this.usersService.findUserById(id);
    }

    @Roles('ADMIN')
    @ApiHeader({
        name: 'access_token',
    })
    @ApiOperation({ 
        summary: 'Método para actualizar los datos de un usuario',
        description: 'Los valores se deben cargar en el body'
    })
    @ApiParam({ name: 'user_id' })
    @Put('/:user_id')
    public async updateUser(@Param('user_id') id: string, @Body() body: UserUpdateDTO) {
        return await this.usersService.updateUser(body, id);
    }

    @Roles('ADMIN')
    @ApiHeader({
        name: 'access_token',
    })
    @ApiOperation({ 
        summary: 'Método para eliminar un usuario',
        description: 'Los valores se deben cargar en el body'
    })
    @ApiParam({ name: 'user_id' })
    @Delete('/:user_id')
    public async deleteUser(@Param('user_id') id: string) {
        return await this.usersService.deleteUser(id);
    }
}

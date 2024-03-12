import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO, UserUpdateDTO } from '../dto/users.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    public async registerUser(@Body() body: UserDTO) {
        return await this.usersService.createUser(body);
    }

    @Roles('ADMIN')
    @Get()
    public async findAllUsers() {
        return await this.usersService.findUsers();
    }

    @PublicAccess()
    @Get('/:user_id')
    public async findUserById(@Param('user_id') id: string) {
        return await this.usersService.findUserById(id);
    }

    @Put('/:user_id')
    public async updateUser(@Param('user_id') id: string, @Body() body: UserUpdateDTO) {
        return await this.usersService.updateUser(body, id);
    }

    @Delete('/:user_id')
    public async deleteUser(@Param('user_id') id: string) {
        return await this.usersService.deleteUser(id);
    }
}

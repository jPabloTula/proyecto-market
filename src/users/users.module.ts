import { Global, Module } from '@nestjs/common';
import { UsersEntity } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    exports: [TypeOrmModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}

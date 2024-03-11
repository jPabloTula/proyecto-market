import { Global, Module } from '@nestjs/common';
import { UsersEntity } from './entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ShoppingSessionEntity } from 'src/shopping-session/entities/shopping-session.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity, ShoppingSessionEntity])],
    exports: [TypeOrmModule],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}

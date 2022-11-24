import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'modules/auth/auth.module';
import { UserEntity } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
    providers: [UserResolver, UserService],
})
export class UserModule {}

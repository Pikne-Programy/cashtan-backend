import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthInfoEntity } from './entities/auth-info.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AuthInfoEntity])],
    providers: [AuthResolver, AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'modules/auth/auth.module';
import { UserEntity } from 'modules/user/entities/user.entity';
import { UserService } from 'modules/user/user.service';
import { BalanceResolver } from './balance.resolver';
import { BalanceService } from './balance.service';
import { BalanceEntity } from './entities/balance.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([BalanceEntity, UserEntity]),
        AuthModule,
    ],
    providers: [BalanceResolver, BalanceService, UserService],
})
export class BalanceModule {}

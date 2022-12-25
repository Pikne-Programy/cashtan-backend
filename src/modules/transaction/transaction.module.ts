import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'modules/auth/auth.module';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity]), AuthModule],
    providers: [TransactionResolver, TransactionService],
})
export class TransactionModule {}

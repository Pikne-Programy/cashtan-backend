import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { TransactionEntity } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(TransactionEntity)
        private readonly transactionRepository: Repository<TransactionEntity>,
    ) {}
    create(createTransactionInput: CreateTransactionInput) {
        // TODO: change balance amount
        return this.transactionRepository.save({
            ...createTransactionInput,
            balance: { id: createTransactionInput.balanceId },
            relations: ['balance'],
        });
    }

    findOne(id: number) {
        return this.transactionRepository.findOne({
            where: { id },
            relations: ['balance'],
        });
    }
}

import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';

@Resolver(() => TransactionEntity)
export class TransactionResolver {
    constructor(private readonly transactionService: TransactionService) {}

    @Mutation(() => TransactionEntity)
    createTransaction(
        @Args('createTransactionInput')
        createTransactionInput: CreateTransactionInput,
    ): Promise<TransactionEntity> {
        return this.transactionService.create(createTransactionInput);
    }

    @Query(() => TransactionEntity, { name: 'transaction' })
    findOne(@Args('id', { type: () => ID }) id: number) {
        return this.transactionService.findOne(id);
    }
}

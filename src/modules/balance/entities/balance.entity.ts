import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TransactionEntity } from 'modules/transaction/entities/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class BalanceEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    amount: number;

    @OneToMany(
        () => TransactionEntity,
        (transactions) => transactions.balance,
        { cascade: true },
    )
    transactions: TransactionEntity[];
}

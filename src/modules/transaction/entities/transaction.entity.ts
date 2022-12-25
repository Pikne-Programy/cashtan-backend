import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BalanceEntity } from 'modules/balance/entities/balance.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class TransactionEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    date: Date;

    @Column()
    amount: number;

    @ManyToOne(() => BalanceEntity, (balance) => balance.transactions)
    @JoinColumn()
    balance: BalanceEntity;
}

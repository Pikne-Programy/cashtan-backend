import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { BalanceEntity } from 'modules/balance/entities/balance.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class UserEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @HideField() //TODO show only own
    email: string;

    @OneToOne(() => BalanceEntity, {
        cascade: true,
        nullable: false,
    })
    @JoinColumn()
    balance: BalanceEntity;
}

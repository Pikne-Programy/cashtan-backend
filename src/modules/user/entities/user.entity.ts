import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class UserEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    name: string;

    @HideField() //TODO show only own
    email: string;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'modules/user/entities/user.entity';

@ObjectType()
export class AuthPayload {
    @Field(() => UserEntity)
    user: UserEntity;

    token: string;
}

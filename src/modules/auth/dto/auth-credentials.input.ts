import { InputType } from '@nestjs/graphql';

@InputType()
export class AuthCredentialsInput {
    username: number;

    password: number;
}

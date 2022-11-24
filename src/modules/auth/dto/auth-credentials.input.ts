import { InputType } from '@nestjs/graphql';

@InputType()
export class AuthCredentialsInput {
    username: string;

    password: string;
}

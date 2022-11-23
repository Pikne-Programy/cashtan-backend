import { InputType } from '@nestjs/graphql';
import { AuthCredentialsInput } from './auth-credentials.input';

@InputType()
export class RegisterInput extends AuthCredentialsInput {
    email: string;
}

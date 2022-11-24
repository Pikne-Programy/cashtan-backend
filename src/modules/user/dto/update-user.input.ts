import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
    name?: string;
    email?: string;
}

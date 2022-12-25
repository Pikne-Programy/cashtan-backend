import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
    date: Date;
    amount: number;
    balanceId: string;
}

import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'common/consts';
import { Auth } from 'common/current-user.decorator';
import { UserService } from 'modules/user/user.service';
import { BalanceService } from './balance.service';
import { BalanceEntity } from './entities/balance.entity';

@Resolver(() => BalanceEntity)
export class BalanceResolver {
    constructor(
        private readonly balanceService: BalanceService,
        private readonly userService: UserService,
    ) {}

    @Query(() => BalanceEntity, { name: 'balance' })
    findOne(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<BalanceEntity> {
        return this.balanceService.findOne(id);
    }

    @Mutation(() => BalanceEntity)
    withdraw(
        @Auth() currentUser: CurrentUser,
        @Args('amount', { type: () => Int }) amount: number,
    ): Promise<BalanceEntity> {
        return this.balanceService.withdraw(currentUser, amount);
    }

    @Mutation(() => BalanceEntity)
    deposit(
        @Auth() currentUser: CurrentUser,
        @Args('amount', { type: () => Int }) amount: number,
    ): Promise<BalanceEntity> {
        return this.balanceService.deposit(currentUser, amount);
    }

    @Mutation(() => BalanceEntity)
    async create(userId: string): Promise<BalanceEntity> {
        const user = await this.userService.findOne(userId);
        return this.balanceService.create(user);
    }
}

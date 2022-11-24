import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'common/consts';
import { Auth } from 'common/current-user.decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
@Resolver(() => UserEntity)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => UserEntity, { name: 'user' })
    findOne(@Args('id', { type: () => ID }) id: string): Promise<UserEntity> {
        return this.userService.findOne(id);
    }

    @Mutation(() => UserEntity)
    userUpdate(
        @Auth() currentUser: CurrentUser,
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ): Promise<UserEntity> {
        return this.userService.update(currentUser, updateUserInput);
    }
}

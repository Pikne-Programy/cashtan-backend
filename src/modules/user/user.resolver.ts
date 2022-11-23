import { Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
//TODO
@Resolver(() => UserEntity)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [UserEntity], { name: 'user' })
    findAll() {
        return this.userService.findAll();
    }

    // @Query(() => UserEntity, { name: 'user' })
    // findOne(@Args('id', { type: () => Int }) id: number) {
    //     return this.userService.findOne(id);
    // }

    // @Mutation(() => UserEntity)
    // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    //     return this.userService.update(updateUserInput.id, updateUserInput);
    // }
}

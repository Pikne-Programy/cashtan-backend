import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'common/consts';
import { Auth } from 'common/current-user.decorator';
import { AuthService } from './auth.service';
import { AuthCredentialsInput } from './dto/auth-credentials.input';
import { RegisterInput } from './dto/register.input';
import { AuthPayload } from './entities/auth.entity';

@Resolver(() => AuthPayload)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => AuthPayload)
    register(
        @Args('credentials') credentials: RegisterInput,
    ): Promise<AuthPayload> {
        return this.authService.register(credentials);
    }

    @Mutation(() => AuthPayload)
    login(
        @Args('credentials') credentials: AuthCredentialsInput,
    ): Promise<AuthPayload> {
        return this.authService.login(credentials);
    }

    @Mutation(() => Boolean)
    async logout(@Auth() currentUser: CurrentUser) {
        await this.authService.logout(currentUser);

        return true;
    }

    @Mutation(() => AuthPayload)
    changePassword(
        @Auth() currentUser: CurrentUser,
        @Args('newPassword') password: string,
    ): Promise<AuthPayload> {
        return this.authService.changePassword(currentUser, password);
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Args('username', { type: () => String }) username: string,
    ) {
        await this.authService.forgotPassword(username);

        return true;
    }
}

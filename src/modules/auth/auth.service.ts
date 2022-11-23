import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'common/consts';
import { UserEntity } from 'modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsInput } from './dto/auth-credentials.input';
import { AuthInfoEntity } from './entities/auth-info.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthInfoEntity)
        private readonly authInfoRepository: Repository<AuthInfoEntity>,
    ) {
        //TODO
        return 0 as any;
    }

    register(createAuthInput: AuthCredentialsInput) {
        //TODO
        return 0 as any;
    }

    login(credentials: AuthCredentialsInput) {
        //TODO
        return 0 as any;
    }

    logout(id: string) {
        //TODO
        return 0 as any;
    }

    changePassword(currentUser: CurrentUser, password: string) {
        //TODO
        return 0 as any;
    }

    forgotPassword(username: string) {
        //TODO
        return 0 as any;
    }

    retrieveUserFromToken(token: string): Promise<UserEntity> {
        //TODO
        return 0 as any;
    }
}

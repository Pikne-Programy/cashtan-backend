import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as assert from 'assert';
import { compare, hash } from 'bcrypt';
import { CurrentUser } from 'common/consts';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { AuthCredentialsInput } from './dto/auth-credentials.input';
import { RegisterInput } from './dto/register.input';
import { AuthInfoEntity } from './entities/auth-info.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthInfoEntity)
        private readonly authInfoRepository: Repository<AuthInfoEntity>,
    ) {}

    private readonly saltRounds = 10;

    async register({ password, ...createAuthInput }: RegisterInput) {
        const passwordHash = await hash(password, this.saltRounds);

        const { user, token } = await this.authInfoRepository.save({
            password: passwordHash,
            token: randomUUID(),
            user: createAuthInput,
        });

        return { user, token };
    }

    async login({ username, password }: AuthCredentialsInput) {
        const {
            user,
            password: passwordHash,
            id,
        } = await this.authInfoRepository.findOneOrFail({
            where: {
                user: {
                    name: username,
                },
            },
            select: {
                password: true,
                id: true,
            },
            relations: {
                user: true,
            },
        });

        assert(await compare(password, passwordHash));

        const token = randomUUID();

        await this.authInfoRepository.save({
            id,
            token,
        });

        return { user, token };
    }

    logout(currentUser: CurrentUser) {
        return this.authInfoRepository
            .createQueryBuilder()
            .update()
            .set({ token: null })
            .where('user.id = :id', { id: currentUser.id })
            .execute();
    }

    changePassword(currentUser: CurrentUser, password: string) {
        //TODO
        return 0 as any;
    }

    forgotPassword(username: string) {
        //TODO
        return 0 as any;
    }

    async retrieveUserFromToken(token: string): Promise<CurrentUser> {
        const { user } = await this.authInfoRepository.findOneOrFail({
            where: { token },
            relations: {
                user: true,
            },
        });

        return user;
    }
}

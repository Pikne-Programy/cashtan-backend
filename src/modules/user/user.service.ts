import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'common/consts';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    findOne(id: string) {
        return this.userRepository.findOne({
            where: {
                id,
            },
        });
    }

    update(currentUser: CurrentUser, updateUserInput: UpdateUserInput) {
        // it won't insert
        // user can't be deleted
        return this.userRepository.save({
            ...updateUserInput,
            id: currentUser.id,
        });
    }
}

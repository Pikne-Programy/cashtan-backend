import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'common/consts';
import { UserEntity } from 'modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { BalanceEntity } from './entities/balance.entity';

@Injectable()
export class BalanceService {
    constructor(
        @InjectRepository(BalanceEntity)
        private readonly balanceRepository: Repository<BalanceEntity>,
    ) {}

    create(user: UserEntity): Promise<BalanceEntity> {
        return this.balanceRepository.save({ amount: 0, user });
    }

    findOne(id: string): Promise<BalanceEntity> {
        return this.balanceRepository.findOneOrFail({
            where: {
                id,
            },
            relations: ['transactions'],
        });
    }

    async withdraw(currentUser: CurrentUser, amount: number) {
        // TODO: amount > 0
        const entity = await this.findOne(currentUser.id);
        // TODO: amount to withdraw > amount in balance
        await this.balanceRepository.update(
            { id: currentUser.id },
            { amount: entity.amount - amount },
        );
        return entity;
    }

    async deposit(currentUser: CurrentUser, amount: number) {
        // TODO: amount > 0
        const entity = await this.findOne(currentUser.id);
        await this.balanceRepository.update(
            { id: currentUser.id },
            { amount: entity.amount + amount },
        );
        return entity;
    }
}

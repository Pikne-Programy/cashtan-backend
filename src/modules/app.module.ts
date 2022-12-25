import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQlModuleConfig } from 'config/graphql.module.config';
import { TypeOrmModuleConfig } from 'config/typeorm.module.config';
import { AuthModule } from './auth/auth.module';
import { BalanceModule } from './balance/balance.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({ expandVariables: true, isGlobal: true }),
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useClass: GraphQlModuleConfig,
        }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmModuleConfig,
        }),
        UserModule,
        AuthModule,
        BalanceModule,
        TransactionModule,
    ],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class TypeOrmModuleConfig implements TypeOrmOptionsFactory {
    constructor(private readonly config: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const isProduction = this.config.get('NODE_ENV') === 'production';

        return {
            type: 'postgres',
            host: this.config.get('DB_HOST'),
            port: this.config.get('DB_PORT'),
            username: this.config.get('DB_USER', 'postgres'),
            password: this.config.get('DB_PASSWORD'),
            database: this.config.get('DB_NAME'),
            autoLoadEntities: true,
            migrationsRun: isProduction,
            migrations: [join(__dirname, '../migrations/*.{ts,js}')],
            synchronize: !isProduction,
            logging: !isProduction && ['query'],
            useUTC: true,
            //dropSchema: true,
        };
    }
}

import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { cors } from 'common/cors';

@Injectable()
export class GraphQlModuleConfig implements GqlOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createGqlOptions(): Omit<ApolloDriverConfig, 'driver'> {
    return {
      cors,
      introspection: true,
      debug: this.config.get('NODE_ENV') !== 'production',
      playground: false,
      subscriptions: {
        'graphql-ws': true,
      },
      autoSchemaFile: true,
      transformAutoSchemaFile: true,

      context: ({ req }) => ({ req, startTime: Date.now() }),
    };
  }
}

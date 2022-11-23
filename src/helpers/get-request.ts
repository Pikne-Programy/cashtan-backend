import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const getRequest = (context: ExecutionContext): Request =>
    GqlExecutionContext.create(context).getContext().req;

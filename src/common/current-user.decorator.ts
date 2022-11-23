import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getRequest } from 'helpers/get-request';
import { currentUserSymbol } from './consts';

export const Auth = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => getRequest(ctx)[currentUserSymbol],
);

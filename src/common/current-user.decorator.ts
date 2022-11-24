import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { getRequest } from 'helpers/get-request';
import { AuthGuard } from 'modules/auth/guards/auth.guard';
import { currentUserSymbol } from './consts';

export const Auth = createParamDecorator(
    (_: unknown, ctx: ExecutionContext) => getRequest(ctx)[currentUserSymbol],
    [
        (target, propertyKey) =>
            UseGuards(AuthGuard)(
                target,
                propertyKey,
                Object.getOwnPropertyDescriptor(target, propertyKey)!,
            ),
    ],
);

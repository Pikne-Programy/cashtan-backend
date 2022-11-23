import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CurrentUser, currentUserSymbol } from 'common/consts';
import { getRequest } from 'helpers/get-request';
import { AuthService } from '../auth.service';

declare module 'express' {
    interface Request {
        currentUserPromise?: Promise<CurrentUser>;
    }
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = getRequest(context);

        if (!req.currentUserPromise) {
            const token = req.header('Authorization')?.replace('Bearer ', '');

            // prevents retrieving user more than once
            // can be called concurently
            req.currentUserPromise =
                this.authService.retrieveUserFromToken(token);
        }

        const user = await req.currentUserPromise;

        req[currentUserSymbol] = user;

        return true;
    }
}

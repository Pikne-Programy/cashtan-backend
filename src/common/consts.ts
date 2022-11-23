export const currentUserSymbol = Symbol('currentUserSymbol');

export interface CurrentUser {
    id: string;
    // here can be added additional data
}

declare module 'express' {
    interface Request {
        [currentUserSymbol]?: CurrentUser;
    }
}

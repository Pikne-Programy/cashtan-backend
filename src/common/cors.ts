import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const cors: CorsOptions = {
    allowedHeaders: '*,Authorization,Content-type',
    origin: (reqOrigin, cb) => cb(null, reqOrigin),
    credentials: true,
    exposedHeaders: '*,Authorization',
};

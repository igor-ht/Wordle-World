import dotenv from 'dotenv';

dotenv.config();

export const serverHost = process.env.APP_HOST!;
export const serverPort = +process.env.APP_PORT!;
export const serverOrigin = +process.env.APP_ORIGIN!;

export const encryptionKey = process.env.APP_WORD_KEY!;

export const hashKey = process.env.APP_PASS_KEY!;

export const accessTokenSecret = process.env.APP_ACCESS_TOKEN_KEY!;
export const refreshTokenSecret = process.env.APP_REFRESH_TOKEN_KEY!;

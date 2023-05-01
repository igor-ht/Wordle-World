import dotenv from 'dotenv';

dotenv.config();

export const serverHost = process.env.APP_HOST as string;
export const serverPort = +(process.env.APP_PORT as string);
export const serverOrigin = process.env.APP_ORIGIN as string;

export const encryptionKey = process.env.APP_WORD_KEY as string;

export const hashKey = process.env.APP_PASS_KEY as string;

export const accessTokenSecret = process.env.APP_ACCESS_TOKEN_KEY as string;
export const refreshTokenSecret = process.env.APP_REFRESH_TOKEN_KEY as string;

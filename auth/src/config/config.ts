import 'dotenv/config'

export const nodeEnv = <string>process.env.NODE_ENV || 'development'

//APPS
export const portAuth = process.env.PORT_AUTH || 3001;
export const portBusiness = process.env.PORT_BUSINESS || 3002;
export const hostAuth = <string>process.env.HOST_AUTH || 'localhost';
export const hostBusiness = <string>process.env.HOST_BUSINESS || 'localhost';

//DATABASE
export const dbUri = <string>process.env.DB_URI;


//CACHE
export const cacheHost = <string>process.env.CACHE_HOST || 'localhost';
export const cachePort = process.env.PORT_CACHE || 6379;
export const cacheTll = process.env.CACHE_TTL || 180;


//JWT
export const passwordHashSalt = process.env.PASSWORD_HASH_SALT || 8;
export const jwtSecret = process.env.JWT_SECRET || "token.0101010101";
export const jwtExpires = process.env.JWT_EXPIRES || "1h";
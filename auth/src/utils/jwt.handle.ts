import { sign, verify } from 'jsonwebtoken'
import { jwtSecret, jwtExpires } from '../config/config'
import { CustomError } from './customError.handle'

export const generateToken = (id: string): string => {
  try {
    const jwt = sign({ id }, jwtSecret, { expiresIn: jwtExpires })
    return jwt
  } catch (error: any) {
    throw new CustomError(error.message, error.code || error.status || 401);
  }
}

export const verifyToken = (jwt: string): boolean => {
  try {
    const isVerify = verify(jwt, jwtSecret)
    return isVerify ? true : false
  } catch (error: any) {
    throw new CustomError(error?.message || 'Invalid or expired token', error?.code || error?.status || 401);
  }
}
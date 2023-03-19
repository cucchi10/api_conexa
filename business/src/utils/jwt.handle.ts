import { verify } from 'jsonwebtoken'
import { jwtSecret } from '../config/config'
import { CustomError } from './customError.handle'


export const verifyToken = (jwt: string): boolean => {
  try {
    const isVerify = verify(jwt, jwtSecret)
    return isVerify ? true : false
  } catch (error: any) {
    throw new CustomError(error.message, error.code || error.status);
  }
}
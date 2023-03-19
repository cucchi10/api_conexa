
import { Request, Response, NextFunction } from 'express';
import { UserLogin, UserRegister } from '../interfaces/user.interface';
import { registerNewUser } from '../services/auth.service';
import { getUser } from '../services/user.service';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { CustomError } from '../utils/customError.handle';
import { getResponseCustom } from '../utils/customResponse.handle';
import { generateToken } from '../utils/jwt.handle';
import cacheController from '../services/cache/cacheController';
import { validateDataUser } from '../utils/validations.handle';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    if (!email || !password) throw new CustomError(`Fill in all fields.`, 400)
    const emailStandard = email.toString().toLowerCase()

    validateDataUser({ email: emailStandard, password })

    const carExist = await getUser({ email: emailStandard })
    if (carExist) throw new CustomError(`User already exists`, 400)

    const passwordHash: string = await encrypt(password)

    const newUser = await registerNewUser({ email: emailStandard, password: passwordHash })
    if (!newUser) throw new CustomError(`Error registering new User.`, 404)

    const { password: _, ...userData } = newUser

    const user: UserRegister = {
      user: {
        ...userData
      }
    }

    await cacheController.delUsers()

    return getResponseCustom(res, 200, user)
  } catch (error) {
    next(error);
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    if (!email || !password) throw new CustomError(`Please enter the correct username and password`, 401)
    const emailStandard = email.toString().toLowerCase()
    validateDataUser({ email: emailStandard, password })

    const userExist = await getUser({ email: emailStandard })
    if (!userExist) throw new CustomError(`Wrong username or password`, 401)

    const { password: passwordHash, ...userData } = userExist;

    const isCorrect: boolean = await verified(password, passwordHash)
    if (!isCorrect) throw new CustomError(`Wrong username or password`, 400)

    const token: string = generateToken(userData.email)

    const user: UserLogin = {
      token,
      user: {
        ...userData
      }
    }

    return getResponseCustom(res, 200, user)
  } catch (error) {
    next(error);
  }
}


export const authController: {} = {
  login,
  register,
}
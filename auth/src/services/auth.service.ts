import { Auth, User } from "../interfaces/user.interface"
import UserModel from "../models/user.model"
import { CustomError } from "../utils/customError.handle"

const registerNewUser = async ({ email, password }: Auth): Promise<User | null> => {
  try {
    const response = await UserModel.create({ email, password })
    return response.toObject()
  } catch (error: any) {
    throw new CustomError(error.message, error.status);
  }
}

export { registerNewUser }
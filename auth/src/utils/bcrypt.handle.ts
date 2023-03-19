import { hash, compare } from "bcryptjs";
import { passwordHashSalt } from "../config/config";
import { CustomError } from "./customError.handle";

export const encrypt = async (password: string): Promise<string> => {

  try {
    const passwordHash = await hash(password, passwordHashSalt)
    return passwordHash
  } catch (error: any) {
    throw new CustomError(error.message, error.code || error.status);
  }
}

export const verified = async (password: string, passwordHash: string): Promise<boolean> => {
  try {
    const isCorrect = await compare(password, passwordHash)
    return isCorrect
  } catch (error: any) {
    throw new CustomError(error.message, error.code || error.status);
  }
}
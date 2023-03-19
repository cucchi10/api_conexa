import { CustomError } from "./customError.handle";
import { Validator } from 'validator.ts/Validator';
import { UserValidations } from "../interfaces/user.interface";
import { ValidationErrorInterface } from "validator.ts/ValidationErrorInterface";
import { newUser } from "./user.handle";

function formatErrors(errors: ValidationErrorInterface[]): string {
  const errorMessages = errors.map((error) => `${error.property}: ${error.errorMessage || error.errorName}`).join(', ');
  return errorMessages
}

export function validateDataUser(data: UserValidations): void {
  try {
    const validator = new Validator();

    const userData = newUser(data)

    let errors = validator.validate(userData, { skipMissingProperties: true })
    if (errors.length) {
      const a = formatErrors(errors)
      throw new CustomError(`${a}`, 412)
    }

  } catch (error: any) {
    throw new CustomError(error.message, error.code || error.status)
  }
}
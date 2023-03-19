import { IsLength, IsEmail } from "validator.ts/decorator/Validation";
export interface Auth {
  email: string;
  password: string;
}

export interface User extends Auth {
  name: string;
  description: string;
}


export interface UserRegister {
  user: {
    name: string;
    email: string;
    description: string;
  }
}

export interface UserLogin extends UserRegister {
  token: string;
}

export interface UserSafety {
  email: string;
  name: string;
  description: string;
}


export interface UserValidations {
  email?: string;
  name?: string;
  description?: string;
  password?: string;
}

export class ValidateUser implements UserValidations {

  @IsLength(6, 30, { message: 'min 6 - max 30' })
  password?: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  email?: string;

  @IsLength(5, 45, { message: 'min 5 - max 45' })
  name?: string;

  @IsLength(1, 45, { message: 'min 1 - max 45' })
  description?: string;

}

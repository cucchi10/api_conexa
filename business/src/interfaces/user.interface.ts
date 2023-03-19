import { IsLength, IsEmail } from "validator.ts/decorator/Validation";
export interface UserSafety {
  email: string;
  name: string;
  description: string;
}

export interface User extends UserSafety {
  password: string;
}

export interface UserResponse {
  count: number;
  rows: UserSafety[] | [];
}

export interface UserValidations {
  email?: string;
  name?: string;
  description?: string;
  password?: string;
}

export interface UserQuery {
  email?: {
    $regex: RegExp;
  };
}

export class ValidateUser implements UserValidations {

  @IsLength(10, 20)
  password?: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  email?: string;

  @IsLength(5, 45)
  name?: string;

  @IsLength(1, 45)
  description?: string;

}
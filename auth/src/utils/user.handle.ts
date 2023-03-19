import { ValidateUser, UserValidations } from "../interfaces/user.interface";

export const newUser = (data: UserValidations) => {
  const post = new ValidateUser();

  if (data.password) {
    post.password = data.password;
  }
  if (data.email) {
    post.email = data.email;
  }
  if (data.name) {
    post.name = data.name;
  }
  if (data.description) {
    post.description = data.description;
  }
  return post;
}
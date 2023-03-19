import { UserValidations } from "../src/interfaces/user.interface";
import { validateDataUser } from "../src/utils/validations.handle";

describe('validateDataUser', () => {
  it('Se espera un Error por datos invalidos', () => {
    const data: UserValidations = {
      email: 'invalid email',
      password: '123',
    };

    expect(() => validateDataUser(data)).toThrow();
  });

  it('No debe generar un Eror, los datos son validos', () => {
    const data: UserValidations = {
      email: 'test@example.com',
      password: 'password123',
    };

    expect(() => validateDataUser(data)).not.toThrow();
  });
});
import { encrypt, verified } from "../src/utils/bcrypt.handle";

describe('password utils', () => {
  let password: string;
  let passwordHash: string;

  beforeAll(async () => {
    password = 'password123';
    passwordHash = await encrypt(password);
  });

  it('Se controla la password Hash', async () => {
    // typeof = string - length > 0
    expect(typeof passwordHash).toBe('string');
    expect(passwordHash.length).toBeGreaterThan(0);
  });

  it('Se espera true por contraseña correcta', async () => {
    const isCorrect = await verified(password, passwordHash);
    expect(isCorrect).toBe(true);
  });

  it('Se espera false por contraseña incorrecta', async () => {
    const isCorrect = await verified('incorrectPassword', passwordHash);
    expect(isCorrect).toBe(false);
  });
});
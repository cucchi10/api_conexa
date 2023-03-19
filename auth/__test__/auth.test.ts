import { generateToken, verifyToken } from "../src/utils/jwt.handle";

describe('authentication', () => {
  let token: string;

  it('Se genera un JWT valido', () => {
    const userId = '123';
    token = generateToken(userId);

    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('Se verifica JWT valido', () => {
    const isVerified = verifyToken(token);

    expect(isVerified).toBe(true);
  });

  it('Se verifica un JWT invalido', () => {
    expect(() => verifyToken('invalid token')).toThrow();
  });
});
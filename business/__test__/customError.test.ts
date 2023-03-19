import { CustomError } from "../src/utils/customError.handle";


describe('CustomError', () => {
  it('se crea una instancia de CustomError y se comparan sus props', () => {
    const message = 'Error message';
    const code = 404;

    const error = new CustomError(message, code);

    expect(error.message).toEqual(message);
    expect(error.code).toEqual(code);
    expect(error.name).toEqual('CustomError');
    expect(error.stack).toBeDefined();
  });
});
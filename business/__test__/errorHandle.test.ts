import { errorHandler } from "../src/utils/errorHandler.handle";
import { Request } from 'express';
import { CustomError } from "../src/utils/customError.handle";

describe('errorHandler', () => {
  const req = {} as Request;
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  } as any;
  const next = jest.fn();

  it('Se genera un error y se espera respuesta JSON', () => {
    const error = new CustomError('Something went wrong', 500);

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      message: 'Something went wrong',
      success: false,
      data: [],
    });
  });

  it('Se genera un error de base de datos, se espera una respuesta JSON', () => {
    const error = new CustomError('Duplicate key error', 11000);

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(412);
    expect(res.json).toHaveBeenCalledWith({
      code: 412,
      message: 'The undefined is already in use',
      success: false,
      data: [],
    });
  });

  it('Se usa next() para un error 404', () => {
    const error = new CustomError('Not found', 404);

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: 404,
      message: 'Not found',
      success: false,
      data: [],
    });
  });

  it('Error sin code, se espera una respuesta JSON', () => {
    const error = new Error('Something else went wrong');

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      code: 500,
      message: 'Something else went wrong',
      success: false,
      data: [],
    });
  });
});
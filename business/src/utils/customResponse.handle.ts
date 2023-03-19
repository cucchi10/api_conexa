import { Response } from 'express';
import { code, ResponseMessage } from "../interfaces/customResponse.interface";

export const getResponseCustom = (res: Response, codeResp: number, data: Object) => {
  const msg: ResponseMessage = {
    code: codeResp,
    message: code[codeResp],
    success: true,
    data,
  };
  res.status(msg.code).send(msg).end();
};
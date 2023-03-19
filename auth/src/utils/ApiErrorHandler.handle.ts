import { AxiosError } from "axios";
import { ApiError, ResponseMessage } from "../interfaces/customResponse.interface";

export function ApiErrorHandler(error: AxiosError): ApiError {
  const { response }: ResponseMessage | any = error;

  const errorResponse: ApiError = {
    data: {
      code: response?.data?.code || response?.status || 500,
      message: response?.data?.message || response?.statusText || 'Unknown error',
      success: response?.data?.success || false,
      data: response?.data?.data || [],
    }
  }

  return errorResponse
}
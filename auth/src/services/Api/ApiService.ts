import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from '../../interfaces/customResponse.interface';
import { ApiErrorHandler } from '../../utils/ApiErrorHandler.handle';

const axiosService = axios.create();

export const get = async (url: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse | ApiError> => {
  try {
    const response = await axiosService.get(url, { ...options });
    return response;
  } catch (error: AxiosError | any) {
    return ApiErrorHandler(error)
  }
};

export const post = async (url: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse | ApiError> => {
  try {
    const { data = {}, ...rest } = options;
    const response = await axiosService.post(url, data, rest);
    return response;
  } catch (error: AxiosError | any) {
    return ApiErrorHandler(error)
  }
};

export const put = async (url: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse | ApiError> => {
  try {
    const { data = {}, ...rest } = options;
    const response = await axiosService.put(url, data, rest);
    return response;
  } catch (error: AxiosError | any) {
    return ApiErrorHandler(error)
  }
};

export const patch = async (url: string, body: any): Promise<AxiosResponse | ApiError> => {
  try {
    const response = await axiosService.patch(url, body);
    return response;
  } catch (error: AxiosError | any) {
    return ApiErrorHandler(error)
  }
};

export const del = async (url: string): Promise<AxiosResponse | ApiError> => {
  try {
    const response = await axiosService.delete(url);
    return response;
  } catch (error: AxiosError | any) {
    return ApiErrorHandler(error)
  }
};
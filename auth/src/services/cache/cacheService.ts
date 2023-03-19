import { CustomError } from '../../utils/customError.handle'
import { ICacheService } from '../../interfaces/cache.interface'
import { cacheTll } from '../../config/config'
import cacheConnect from '../../config/cache';

const cache = cacheConnect();

const cacheService: ICacheService = {
  set: async (key: string, value: any, ttl: number = Number(cacheTll)): Promise<boolean> => {
    try {
      const response = await cache.set(key, value, 'EX', ttl);
      return response ? true : false
    } catch (error: any) {
      throw new CustomError(error.message, error.status);
    }
  },
  get: async (key: string): Promise<any> => {
    try {
      const response = await cache.get(key);
      return response
    } catch (error: any) {
      throw new CustomError(error.message, error.status);
    }
  },
  del: async (key: string): Promise<boolean> => {
    try {
      const response = await cache.del(key);
      return response ? true : false
    } catch (error: any) {
      throw new CustomError(error.message, error.status);
    }
  },
};

export default cacheService;

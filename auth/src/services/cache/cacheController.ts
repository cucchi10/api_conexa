import cacheService from './cacheService';
import { ICacheController } from '../../interfaces/cache.interface'
import { Users } from '../../utils/constants'
import { PaginatedResponse } from '../../interfaces/customPaginate.interface';

const getData = async (key: string): Promise<any> => {
  const data = await cacheService.get(key);
  return JSON.parse(data);
}

const setData = async (key: string, data: any): Promise<void> => {
  await cacheService.set(key, JSON.stringify(data));
}

const getUsers = async (): Promise<PaginatedResponse | null> => {
  const data = await getData(Users);
  return data;
}
const setUsers = async (data: PaginatedResponse): Promise<void> => { await setData(Users, JSON.stringify(data)); };

const delUsers = async (): Promise<void> => { await cacheService.del(Users); };

const cacheController: ICacheController = {
  getData,
  setData,
  getUsers,
  setUsers,
  delUsers,
};

export default cacheController;

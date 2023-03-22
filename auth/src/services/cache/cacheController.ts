import cacheService from './cacheService';
import { ICacheController } from '../../interfaces/cache.interface'
import { Users } from '../../utils/constants'
import { PaginatedResponse, UserPaginationQuery } from '../../interfaces/customPaginate.interface';

const getData = async (key: string): Promise<any> => {
  const data = await cacheService.get(key);
  return JSON.parse(data);
}

const setData = async (key: string, data: any): Promise<void> => {
  await cacheService.set(key, JSON.stringify(data));
}

const getUsers = async ({ page, per_page }: Partial<UserPaginationQuery>): Promise<PaginatedResponse | null> => {
  const data = await getData(`${Users}_${page}_${per_page}`);
  return data;
}
const setUsers = async ({ page, per_page }: Partial<UserPaginationQuery>, data: PaginatedResponse,): Promise<void> => {
  await setData(`${Users}_${page}_${per_page}`, data);
};

const delUsers = async (): Promise<void> => {
  const UsersKeys = await cacheService.keys(`${Users}_*`)
  if (UsersKeys && UsersKeys.length > 0) {
    await cacheService.del(UsersKeys);
  }
};

const cacheController: ICacheController = {
  getData,
  setData,
  getUsers,
  setUsers,
  delUsers,
};

export default cacheController;

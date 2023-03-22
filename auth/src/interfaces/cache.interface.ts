import { PaginatedResponse, UserPaginationQuery } from "./customPaginate.interface";

export interface ICacheService {
  set: (key: string, value: any, ttl?: number) => Promise<boolean>;
  get: (key: string) => Promise<any>;
  del: (key: string) => Promise<boolean>;
  keys: (key: string) => Promise<any>;
}

export interface ICacheController {
  getData(key: string): Promise<any | null>;
  setData(key: string, data: any): Promise<void>;
  getUsers(params: UserPaginationQuery): Promise<PaginatedResponse | null>;
  setUsers(params: UserPaginationQuery, data: PaginatedResponse,): Promise<void>;
  delUsers(): Promise<void>;
}
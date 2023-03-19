import { PaginatedResponse } from "./customPaginate.interface";

export interface ICacheService {
  set: (key: string, value: any, ttl?: number) => Promise<boolean>;
  get: (key: string) => Promise<any>;
  del: (key: string) => Promise<boolean>;
}

export interface ICacheController {
  getData(key: string): Promise<any | null>;
  setData(key: string, data: any): Promise<void>;
  getUsers(): Promise<PaginatedResponse | null>;
  setUsers(data: PaginatedResponse): Promise<void>;
  delUsers(): Promise<void>;
}
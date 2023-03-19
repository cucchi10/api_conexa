import { UserSafety } from "./user.interface";


export interface PaginatedApi {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  data: UserSafety[];
}

export interface PaginatedResponse {
  code: number,
  message: string,
  success: boolean,
  data: PaginatedApi
}
export interface UserPaginationQuery {
  email: string;
  page: number;
  per_page: number;
  search: string;
}
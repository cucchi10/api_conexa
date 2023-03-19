import { UserSafety } from "./user.interface";

export interface PaginatedData {
  rows: UserSafety[];
  count: number;
}

export interface PaginatedResponse {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  data: UserSafety[];
}
export interface UserPaginationQuery {
  email: string;
  page: number;
  per_page: number
  search: string;
}
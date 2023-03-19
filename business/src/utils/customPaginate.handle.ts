import { Response } from 'express';
import { PaginatedData, PaginatedResponse, UserPaginationQuery } from '../interfaces/customPaginate.interface';
import { getResponseCustom } from './customResponse.handle';

export const paginatedResponse = (res: Response, data: PaginatedData, query: UserPaginationQuery) => {
  const total = data.count;
  const current_page = query.page;
  const per_page = query.per_page;
  const last_page = Math.ceil(total / per_page);
  const from = current_page * per_page - per_page + 1;
  const to = current_page * per_page < total ? current_page * per_page : total;

  const pResponse: PaginatedResponse = {
    total,
    per_page,
    current_page,
    last_page,
    from: last_page >= current_page ? from : 0,
    to: last_page >= current_page ? to : 0,
    data: data.rows,
  };

  return getResponseCustom(res, 200, pResponse);
};

import { Request, Response, NextFunction } from 'express';
import { UserPaginationQuery } from '../interfaces/customPaginate.interface';
import { getUserByEmail, getUsers } from '../services/user.service';
import { defaultpage, defaultPerPage } from '../utils/constants';
import { CustomError } from '../utils/customError.handle';
import { paginatedResponse } from '../utils/customPaginate.handle';
import { validateDataUser } from '../utils/validations.handle';

const gets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const paramsQuery: UserPaginationQuery = {
      email: req.query.email?.toString().toLowerCase() || '',
      search: req.query.search?.toString().toLowerCase() || '',
      page: Number(req.query.page) || defaultpage,
      per_page: Number(req.query.per_page) || defaultPerPage
    }

    if (paramsQuery.email) {
      validateDataUser({ email: paramsQuery.email })
      paramsQuery.per_page = 1
    }
    const response = paramsQuery.email ? await getUserByEmail(paramsQuery.email) : await getUsers(paramsQuery)
    if (!response) throw new CustomError(`Error searching for users`, 400)

    return paginatedResponse(res, response, paramsQuery)
  } catch (error) {
    next(error);
  }
}


export const userController: {} = {
  gets
}
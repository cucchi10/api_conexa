import { Request, Response, NextFunction } from 'express';
import cacheController from '../services/cache/cacheController';
import { getUsers } from '../services/user.service';
import { isCacheValid, validateDataUser } from '../utils/validations.handle';
import { defaultPerPage, defaultpage } from '../utils/constants'
import { CustomError } from '../utils/customError.handle';
import { UserPaginationQuery } from '../interfaces/customPaginate.interface';

const gets = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { token } = req.body
    const paramsQuery: UserPaginationQuery = {
      email: req.query.email?.toString().toLowerCase() || '',
      search: req.query.search?.toString().toLowerCase() || '',
      page: Number(req.query.page) || defaultpage,
      per_page: Number(req.query.per_page) || defaultPerPage
    }
    if (!paramsQuery.email) {
      validateDataUser({ email: paramsQuery.email })
    }
    if (!paramsQuery.email && !paramsQuery.search) {
      let cacheUsers = await cacheController.getUsers(paramsQuery)
      if (isCacheValid(cacheUsers, { page: paramsQuery.page, per_page: paramsQuery.per_page })) {
        return res.status(cacheUsers?.code || 200).send(cacheUsers).end();
      }
    }

    const response = await getUsers(paramsQuery, token)
    if (!response) throw new CustomError(`Error searching for users`, 400)

    if (!paramsQuery.email && !paramsQuery.search) {
      await cacheController.setUsers(paramsQuery, response)
    }

    return res.status(response.code).send(response).end()

  } catch (error) {
    next(error);
  }
}


export const userController: {} = {
  gets
}
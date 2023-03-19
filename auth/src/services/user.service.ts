import { Auth, User } from "../interfaces/user.interface"
import UserModel from "../models/user.model"
import { CustomError } from "../utils/customError.handle"
import { get } from '../services/Api/ApiService'
import { businessUrl, authUrl } from '../utils/constants'
import { PaginatedResponse, UserPaginationQuery } from "../interfaces/customPaginate.interface"


const getUser = async ({ email }: Partial<Auth>): Promise<User | null> => {
  try {
    const response = await UserModel.findOne({ email })
    if (!response) {
      return null
    }
    return response.toObject()
  } catch (error: any) {
    throw new CustomError(error.message, error.status);
  }
}

const getUsers = async (paramsQuery: UserPaginationQuery, token: string): Promise<PaginatedResponse> => {
  try {
    const { data } = await get(`${businessUrl}/user`, {
      headers: {
        Authorization: token,
        Origin: authUrl
      },
      params: paramsQuery
    })
    if (!data) throw new CustomError(`Users not found.`, 404)
    return data
  } catch (error: any) {
    throw new CustomError(error.message, error.status);
  }
}


export { getUser, getUsers }
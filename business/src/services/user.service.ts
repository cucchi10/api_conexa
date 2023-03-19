import { UserPaginationQuery } from "../interfaces/customPaginate.interface";
import { UserQuery, UserResponse, UserSafety } from "../interfaces/user.interface"
import UserModel from "../models/user.model"
import { CustomError } from "../utils/customError.handle"
import { getUserWithoutPassword } from "../utils/user.handle";



const getUsers = async (paramsQuery: UserPaginationQuery): Promise<UserResponse> => {
  try {
    let query: UserQuery = {};
    if (paramsQuery.search) {
      query.email = {
        $regex: new RegExp(paramsQuery.search, 'i')
      };
    }

    const total = await UserModel.countDocuments(query);
    const response = await UserModel.find(query)
      .skip((paramsQuery.page - 1) * paramsQuery.per_page)
      .limit(paramsQuery.per_page);

    const usersData: UserSafety[] = response ? [...getUserWithoutPassword([...response.map(r => r.toObject())])] : []

    const users: UserResponse = {
      count: total,
      rows: usersData
    }
    return users

  } catch (error: any) {
    throw new CustomError(error.message, error.status);
  }
}

const getUserByEmail = async (email: string): Promise<UserResponse> => {
  try {
    const response = await UserModel.findOne({ email })

    const usersData: UserSafety[] = response ? [...getUserWithoutPassword([response.toObject()])] : []

    const user: UserResponse = {
      count: 1,
      rows: usersData
    }
    return user

  } catch (error: any) {
    throw new CustomError(error.message, error.status);
  }
}




export { getUsers, getUserByEmail }
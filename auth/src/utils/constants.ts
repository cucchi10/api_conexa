import { portBusiness, hostBusiness, hostAuth, portAuth } from "../config/config"
// URL APIS
export const businessUrl: string = `http://${hostBusiness}:${portBusiness}`
export const authUrl: string = `http://${hostAuth}:${portAuth}`

//Pagination Default
export const defaultpage: number = 1

export enum PerPage {
  TEN = 10,
  FIFTY = 50,
  HUNDRED = 100,
  FIVE_HUNDRED = 500,
  THOUSAND = 1000,
}

// Cache Keys
export const Users: string = 'Users'
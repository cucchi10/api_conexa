import { portBusiness, hostBusiness, hostAuth, portAuth } from "../config/config"
// URL APIS
export const businessUrl: string = `http://${hostBusiness}:${portBusiness}`
export const authUrl: string = `http://${hostAuth}:${portAuth}`

//Pagination Default
export const defaultPerPage: number = 10
export const defaultpage: number = 1
// Cache Keys
export const Users: string = 'Users'
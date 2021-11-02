import {IUser} from './common'

export interface IAuthResponse {
	accessToken: string
	refreshToken: string
	user: IUser
}
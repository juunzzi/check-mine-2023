import {client} from 'src/@domain/api'
import {Barcode, User} from 'src/@domain/types/user'

export const USER_ATHORIZATION_TOKEN_KEY = 'user-authorization-token'

export type JoinUserRequestBody = Omit<User, 'id' | 'accountId'>
export type JoinUserResponseBody = undefined

export type LoginUserRequestBody = Pick<User, 'email' | 'password'>
export interface LoginUserResponseBody {
    data: {accessToken: string}
}

export type GetMeResponseBody = {
    data: User
}

export type GetBarcodeResponseBody = {
    data: Barcode
}

const USER_API = {
    join: (body: JoinUserRequestBody) => {
        return client.post<JoinUserResponseBody>('/users/join', body)
    },
    login: async (body: LoginUserRequestBody) => {
        const {data} = await client.post<LoginUserResponseBody>('/users/login', body)

        return data
    },
    me: async () => {
        const {data} = await client.get<GetMeResponseBody>('/users/me')

        return data
    },
    getBarcode: async () => {
        const {data} = await client.get<GetBarcodeResponseBody>('/users/me/barcode')

        return data
    },
}

export default USER_API

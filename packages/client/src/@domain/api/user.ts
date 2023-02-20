import {client} from 'src/@domain/api'
import {AccessToken, PaymentToken, User} from 'src/@domain/types/user'

export const USER_ATHORIZATION_TOKEN_KEY = 'user-authorization-token'

export type JoinUserRequestBody = Omit<User, 'id' | 'accountId' | 'payment'>
export type JoinUserResponseBody = undefined

export type LoginUserRequestBody = Pick<User, 'email' | 'password'>
export type LoginUserResponseBody = {
    data: AccessToken
}

export type GetMeResponseBody = {
    data: User
}

export type GetPaymentTokenResponseBody = {
    data: PaymentToken
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
    getPaymentToken: async () => {
        const {data} = await client.get<GetPaymentTokenResponseBody>('/users/me/payment-token')

        return data
    },
}

export default USER_API

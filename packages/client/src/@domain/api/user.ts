import {client} from 'src/@domain/api'
import {AccessToken, PaymentToken, PaymentTokenStatus, User} from 'src/@domain/types/user'

export const USER_ATHORIZATION_TOKEN_KEY = 'user-authorization-token'

export type JoinUserRequestBody = Omit<User, 'id' | 'accountId'>
export type JoinUserResponseBody = undefined

export type LoginUserRequestBody = Pick<User, 'email' | 'password'>
export type LoginUserResponseBody = {
    data: AccessToken
}

export type GetMeResponseBody = {
    data: User
}

export type GeneratePaymentTokenResponseBody = {
    data: PaymentToken
}

export type StartPaymentTokenRequestBody = {
    paymentToken: string | null
}
export type StartPaymentTokenResponseBody = undefined

export type CancelPaymentTokenRequestBody = {
    paymentToken: string | null
}
export type CancelPaymentTokenResponseBody = undefined

export type GetPaymentTokenStatusRequestBody = {
    paymentToken: string | null
}
export type GetPaymentTokenStatusResponseBody = {
    data: {
        status: PaymentTokenStatus
    }
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
    generatePaymentToken: async () => {
        const {data} = await client.post<GeneratePaymentTokenResponseBody>('/users/me/payment-token')

        return data
    },
    startPaymentToken: async (body: StartPaymentTokenRequestBody) => {
        const {data} = await client.post<StartPaymentTokenResponseBody>('/users/me/payment-token/start', body)

        return data
    },
    cancelPaymentToken: async (body: CancelPaymentTokenRequestBody) => {
        const {data} = await client.post<CancelPaymentTokenResponseBody>('/users/me/payment-token/cancel', body)

        return data
    },
    getPaymentTokenStatus: async (body: GetPaymentTokenStatusRequestBody) => {
        const {data} = await client.get<GetPaymentTokenStatusResponseBody>('/users/me/payment-token/status', {
            params: {
                ...body,
            },
        })

        return data
    },
}

export default USER_API

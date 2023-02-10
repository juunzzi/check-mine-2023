import {client} from 'src/@domain/api'
import {User} from 'src/@domain/types/user'

export type JoinUserRequestBody = Omit<User, 'id' | 'accountId'>
export type JoinUserResponseBody = undefined

export type LoginUserRequestBody = Pick<User, 'email' | 'password'>
export interface LoginUserResponseBody {
    data: {accessToken: string}
}

const USER_API = {
    join: (body: JoinUserRequestBody) => {
        return client.post<JoinUserResponseBody>('/users/join', body)
    },
    login: async (body: LoginUserRequestBody) => {
        const {data} = await client.post<LoginUserResponseBody>('/users/login', body)

        return data
    },
}

export default USER_API

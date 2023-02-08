import {client} from 'src/@domain/api'

export interface JoinUserRequestBody {
    email: string
    name: string
    payPoint: number
    password: string
}

export const joinUser = (body: JoinUserRequestBody) => {
    return client.post('/users/join', body)
}

import {client} from 'src/@domain/api'
import {User} from 'src/@domain/types/user'

export type JoinUserRequestBody = Omit<User, 'id' | 'accountId'>

const USER_API = {
    join: (body: JoinUserRequestBody) => {
        return client.post<undefined>('/users/join', body)
    },
}

export default USER_API

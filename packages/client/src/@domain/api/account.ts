import {client} from 'src/@domain/api'
import {Account} from 'src/@domain/types/account'

export type AccountCreateRequestBody = Omit<Account, 'id'>
export type AccountCreateResponseBody = undefined

const ACCOUNT_API = {
    create: (body: AccountCreateRequestBody) => {
        return client.post<AccountCreateResponseBody>('/accounts', body)
    },
}

export default ACCOUNT_API

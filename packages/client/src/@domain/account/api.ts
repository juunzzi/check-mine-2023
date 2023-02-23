import {Account} from 'src/@domain/account/types'
import {client} from 'src/@domain/module/api'

export type AccountCreateRequestBody = Omit<Account, 'id' | 'userId'>
export type AccountCreateResponseBody = undefined

export interface GetAccountResponseBody {
    data: {
        account: Account
    }
}

const ACCOUNT_API = {
    get: async () => {
        const {data} = await client.get<GetAccountResponseBody>('/accounts')

        return data
    },
    create: (body: AccountCreateRequestBody) => {
        return client.post<AccountCreateResponseBody>('/accounts', body)
    },
}

export default ACCOUNT_API

import * as DB from 'src/@domain/account/modules/query'
import {isValidCreateAccountInput} from 'src/@domain/account/modules/validation'
import {Account} from 'src/@domain/account/type'

export const getAccount = (userId: number) => {
    return DB.findAccountByUserId(userId)
}

export type CreateAccountInput = Omit<Account, 'id'>

export const createAccount = async (createAccountInput: CreateAccountInput) => {
    if (!isValidCreateAccountInput(createAccountInput)) {
        return null
    }

    return DB.insertAccount(createAccountInput)
}

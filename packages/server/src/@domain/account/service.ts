import * as DB from 'src/@domain/account/modules/query'
import {isValidCreateAccountInput} from 'src/@domain/account/modules/validation'
import {Account} from 'src/@domain/account/type'

export const getAccount = (userId: number) => {
    return DB.findAccountByUserId(userId)
}

export type CreateAccountInput = Omit<Account, 'id'>

export const createAccount = (createAccountInput: CreateAccountInput) => {
    if (!isValidCreateAccountInput(createAccountInput)) {
        throw new Error('계좌 입력 값을 확인해주세요.')
    }

    return DB.insertAccount(createAccountInput)
}

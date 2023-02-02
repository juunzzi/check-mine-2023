import * as DB from 'src/@domain/account/modules/query'
import {isValidCreateAccountInput} from 'src/@domain/account/modules/validation'
import {Account} from 'src/@domain/account/type'

export const getAccount = async (userId: number) => {
    const account = await DB.findAccountByUserId(userId)

    return {
        data: account,
        message: account ? 'SUCCESS' : 'FAILED',
    }
}

export type CreateAccountInput = Omit<Account, 'id'>

export const createAccount = async (createAccountInput: CreateAccountInput) => {
    if (!isValidCreateAccountInput(createAccountInput)) {
        return {
            data: null,
            message: 'CREATE_ACCOUNT_INPUT_ERROR',
        }
    }

    const insertResult = await DB.insertAccount(createAccountInput)

    return {
        data: insertResult,
        message: insertResult ? 'SUCCESS' : 'FAILED',
    }
}

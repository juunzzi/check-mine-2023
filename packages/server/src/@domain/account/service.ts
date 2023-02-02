import * as DB from 'src/@domain/account/modules/query'
import {isValidCreateAccountInput} from 'src/@domain/account/modules/validation'
import {Account} from 'src/@domain/account/type'
import {RES_MSG, RES_MSG_TYPE} from 'src/common/response-message'

export const getAccount = async (userId: number): Promise<{data: any; message: RES_MSG_TYPE}> => {
    const account = await DB.findAccountByUserId(userId)
    const message = account ? RES_MSG.SUCCESS : RES_MSG.FAILURE

    return {
        data: account,
        message,
    }
}

export type CreateAccountInput = Omit<Account, 'id'>

export const createAccount = async (
    createAccountInput: CreateAccountInput,
): Promise<{data: any; message: RES_MSG_TYPE}> => {
    if (!isValidCreateAccountInput(createAccountInput)) {
        return {
            data: null,
            message: RES_MSG.CREATE_ACCOUNT_INPUT_ERROR,
        }
    }

    const insertResult = await DB.insertAccount(createAccountInput)
    const message = insertResult ? RES_MSG.SUCCESS : RES_MSG.FAILURE

    return {
        data: insertResult,
        message,
    }
}

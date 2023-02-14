import {RES_MSG} from 'payment_common/module/constant'
import * as DB from 'src/@domain/account/modules/query'
import {isValidCreateAccountInput} from 'src/@domain/account/modules/validation'
import {Account} from 'src/@domain/account/type'

export type CreateAccountInput = Omit<Account, 'id'>

const ACCOUNT_SERVICE = {
    get: async (userId: number) => {
        const account = await DB.findAccountByUserId(userId)
        const message = account ? RES_MSG.SUCCESS : RES_MSG.FAILURE

        return {
            data: account,
            message,
        }
    },
    create: async (createAccountInput: CreateAccountInput) => {
        if (!isValidCreateAccountInput(createAccountInput)) {
            return {
                message: RES_MSG.CREATE_ACCOUNT_INPUT_ERROR,
            }
        }

        const insertResult = await DB.insertAccount(createAccountInput)
        const message = insertResult ? RES_MSG.SUCCESS : RES_MSG.FAILURE

        return {
            data: insertResult,
            message,
        }
    },
}

export default ACCOUNT_SERVICE

import {RES_MSG} from 'payment_common/module/constant'
import * as ACCOUNT_DB from 'src/@domain/account/modules/query'
import {isValidCreateAccountInput} from 'src/@domain/account/modules/validation'
import {Account} from 'src/@domain/account/type'
import * as USER_DB from 'src/@domain/user/modules/query'

export type CreateAccountInput = Omit<Account, 'id'>

const ACCOUNT_SERVICE = {
    get: async (userId: number) => {
        const user = await USER_DB.findUserById(userId)

        if (!user.accountId) {
            return {
                message: RES_MSG.HAS_NOT_USER_ACCOUNT,
            }
        }

        const account = await ACCOUNT_DB.findAccountByAccountId(user.accountId)

        return {
            data: account,
            message: account ? RES_MSG.GET_ACCOUNT_SUCCESS : RES_MSG.GET_ACCOUNT_FAILURE,
        }
    },
    create: async (createAccountInput: CreateAccountInput) => {
        if (!isValidCreateAccountInput(createAccountInput)) {
            return {
                message: RES_MSG.CREATE_ACCOUNT_INPUT_ERROR,
            }
        }

        const insertResult = await ACCOUNT_DB.insertAccount(createAccountInput)
        const message = insertResult ? RES_MSG.CREATE_ACCOUNT_SUCCESS : RES_MSG.CREATE_ACCOUNT_FAILURE

        return {
            data: insertResult,
            message,
        }
    },
}

export default ACCOUNT_SERVICE

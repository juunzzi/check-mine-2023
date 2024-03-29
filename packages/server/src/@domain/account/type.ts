import {Bank} from 'payment_common/module/constant'
import {isValidBankName} from 'payment_common/module/validation'
import {AuthenticationInfo, isAuthenticationInfoType} from 'src/@domain/user/type'
import {isNumberType, isStringType} from 'src/common/type/guard'

export interface Account {
    id: number
    bankName: Bank
    number: string
    amount: number
    userId: number
}

export interface GetAccountRequestBody {
    authenticationInfo: AuthenticationInfo
}

export const isGetAccountRequestBodyType = (body: any): body is GetAccountRequestBody => {
    return body && isAuthenticationInfoType(body.authenticationInfo)
}

export interface CreateAccountRequestBody extends Omit<Account, 'id' | 'userId'> {
    authenticationInfo: AuthenticationInfo
}

export const isCreateAccountBodyType = (body: any): body is CreateAccountRequestBody => {
    return (
        body &&
        isStringType(body.number) &&
        isNumberType(body.amount) &&
        isValidBankName(body.bankName) &&
        isAuthenticationInfoType(body.authenticationInfo)
    )
}

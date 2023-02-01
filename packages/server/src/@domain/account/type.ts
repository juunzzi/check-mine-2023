import {AuthenticationInfo, isAuthenticationInfo} from 'src/@domain/user/type'

export const BANK = ['국민은행', '신한은행', '토스뱅크'] as const

export type Bank = (typeof BANK)[number]
export interface Account {
    id: number
    bankName: Bank
    number: string
    amount: number
    userId: number
}

export interface AccountRequestBody {
    authenticationInfo: AuthenticationInfo
}

export const isAccountRequestBody = (body: any): body is AccountRequestBody => {
    return body && isAuthenticationInfo(body.authenticationInfo)
}

export interface CreateAccountBody extends Omit<Account, 'id' | 'userId'> {
    authenticationInfo: AuthenticationInfo
}

export const isCreateAccountBody = (body: any): body is CreateAccountBody => {
    return (
        body &&
        typeof body.number === 'string' &&
        typeof body.amount === 'number' &&
        BANK.includes(body.bankName) &&
        isAuthenticationInfo(body.authenticationInfo)
    )
}

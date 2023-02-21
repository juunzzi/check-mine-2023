import {isNullType, isNumberType, isStringType} from 'src/common/type/guard'

export interface User {
    id: number
    name: string
    email: string
    password: string
    payPoint: number
    accountId: number | null
}

export interface AuthenticationInfo {
    id: number
}

export const isAuthenticationInfoType = (authenticationInfo: any): authenticationInfo is AuthenticationInfo => {
    return authenticationInfo && isNumberType(authenticationInfo.id)
}

export interface PaymentTokenInfo {
    id: number
    token: string
}

export const isPaymentTokenInfo = (paymentTokenInfo: any): paymentTokenInfo is PaymentTokenInfo => {
    return paymentTokenInfo && isNumberType(paymentTokenInfo.id) && isStringType(paymentTokenInfo.token)
}

export interface GetMeRequestBody {
    authenticationInfo: AuthenticationInfo
}

export const isGetMeRequestBodyType = (body: any): body is GetMeRequestBody => {
    return body && isAuthenticationInfoType(body.authenticationInfo)
}

export interface GetPaymentTokenRequestBody {
    authenticationInfo: AuthenticationInfo
}

export const isGetPaymentTokenRequestBodyType = (body: any): body is GetPaymentTokenRequestBody => {
    return body && isAuthenticationInfoType(body.authenticationInfo)
}

export type EditMeRequestBody = Omit<User, 'password'>

export const isEditMeRequestBodyType = (body: any): body is EditMeRequestBody => {
    return (
        body &&
        isNumberType(body.id) &&
        isNumberType(body.payPoint) &&
        isStringType(body.name) &&
        isStringType(body.email) &&
        (isNullType(body.accountId) || isNumberType(body.accountId))
    )
}

export type JoinRequestBody = Omit<User, 'accountId'>

export const isJoinRequestBodyType = (body: any): body is JoinRequestBody => {
    return (
        body &&
        isStringType(body.name) &&
        isStringType(body.email) &&
        isStringType(body.password) &&
        isNumberType(body.payPoint)
    )
}

export type LoginRequestBody = Pick<User, 'email' | 'password'>

export const isLoginRequestBodyType = (body: any): body is LoginRequestBody => {
    return body && isStringType(body.email) && isStringType(body.password)
}

export interface GetPaymentStatusRequestBody {
    paymentTokenInfo: PaymentTokenInfo
}

export const isGetPaymentStatusRequestBody = (body: any): body is GetPaymentStatusRequestBody => {
    return isPaymentTokenInfo(body.paymentTokenInfo)
}

export interface StartOrderRequestBody {
    paymentTokenInfo: PaymentTokenInfo
}

export const isStartOrderRequestBody = (body: any): body is StartOrderRequestBody => {
    return isPaymentTokenInfo(body.paymentTokenInfo)
}

export interface CancelOrderRequestBody {
    paymentTokenInfo: PaymentTokenInfo
}

export const isCancelOrderRequestBody = (body: any): body is CancelOrderRequestBody => {
    return isPaymentTokenInfo(body.paymentTokenInfo)
}

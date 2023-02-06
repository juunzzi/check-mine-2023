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

export interface BarcodeInfo {
    id: number
}

export const isBarcodeInfo = (barcodeInfo: any): barcodeInfo is BarcodeInfo => {
    return barcodeInfo && isNumberType(barcodeInfo.id)
}

export interface GetMeRequestBody {
    authenticationInfo: AuthenticationInfo
}

export const isGetMeRequestBodyType = (body: any): body is GetMeRequestBody => {
    return body && isAuthenticationInfoType(body.authenticationInfo)
}

export interface GetBarcodeTokenRequestBody {
    authenticationInfo: AuthenticationInfo
}

export const isGetBarcodeTokenRequestBodyType = (body: any): body is GetBarcodeTokenRequestBody => {
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

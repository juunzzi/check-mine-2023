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

export const isAuthenticationInfo = (authenticationInfo: any): authenticationInfo is AuthenticationInfo => {
    return authenticationInfo && typeof authenticationInfo.id === 'number'
}

export interface BarcodeInfo {
    id: number
}

export const isBarcodeInfo = (barcodeInfo: any): barcodeInfo is BarcodeInfo => {
    return barcodeInfo && typeof barcodeInfo.id === 'number'
}

export interface MeRequestBody {
    authenticationInfo: AuthenticationInfo
}

export const isMeRequestBodyType = (body: any): body is MeRequestBody => {
    return body && isAuthenticationInfo(body.authenticationInfo)
}

export interface BarcodeRequestBody {
    barcodeInfo: BarcodeInfo
}

export const isBarcodeRequestBody = (body: any): body is BarcodeRequestBody => {
    return body && isBarcodeInfo(body.barcodeInfo)
}

export type EditMeRequestBodyType = Omit<User, 'password'>

export const isEditMeRequestBodyType = (body: any): body is EditMeRequestBodyType => {
    return (
        body &&
        typeof body.id === 'number' &&
        typeof body.name === 'string' &&
        typeof body.email === 'string' &&
        typeof body.payPoint === 'number' &&
        (body.accountId === null || typeof body.accountId === 'number')
    )
}

export type JoinRequestBody = Omit<User, 'accountId'>

export const isJoinRequestBodyType = (body: any): body is JoinRequestBody => {
    return (
        body &&
        typeof body.name === 'string' &&
        typeof body.email === 'string' &&
        typeof body.password === 'string' &&
        typeof body.payPoint === 'number'
    )
}

export type LoginRequestBody = Pick<User, 'email' | 'password'>

export const isLoginRequestBodyType = (body: any): body is LoginRequestBody => {
    return body && typeof body.email === 'string' && typeof body.password === 'string'
}

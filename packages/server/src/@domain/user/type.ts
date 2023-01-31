export interface User {
    id: number
    name: string
    email: string
    password: string
    payPoint: number
    accountId: null
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

export interface MeRequestBody {
    decoded: {
        id: number
    }
}

export const isMeRequestBodyType = (body: any): body is MeRequestBody => {
    return body && typeof body?.decoded?.id === 'number'
}

export type EditMeRequestBodyType = Omit<User, 'password'>

export const isEditMeRequestBodyType = (body: any): body is EditMeRequestBodyType => {
    return (
        body &&
        body.accountId === null &&
        typeof body.id === 'number' &&
        typeof body.name === 'string' &&
        typeof body.email === 'string' &&
        typeof body.payPoint === 'number'
    )
}

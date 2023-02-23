import {VerifyErrors} from 'jsonwebtoken'
import {Middleware} from 'koa'
import {RES_MSG} from 'payment_common/module/constant'
import {decodeUserJWT} from 'src/@domain/user/modules/jwt'
import Logger from 'src/common/logger/winston'
import {isNumberType} from 'src/common/type/guard'

const isJsonWebTokenError = (error: any): error is VerifyErrors => {
    return error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'
}

const isDecodedAccessToken = (decoded: any): decoded is {id: number} => {
    return decoded && isNumberType(decoded.id)
}

export const authenticateAccessToken = (): Middleware => async (ctx, next) => {
    const {headers} = ctx.request

    const token = headers['authorization'] && headers['authorization'].split(' ')[1]

    if (!token) {
        ctx.status = 401
        ctx.body = {
            message: RES_MSG.AUTHORIZATION_ERROR,
        }

        return
    }

    try {
        const decoded = await decodeUserJWT({token, errorResolve: false})

        ctx.request.body = {
            authenticationInfo: decoded,
            ...(ctx.request.body ?? {}),
        }

        await next()
    } catch (error) {
        if (isJsonWebTokenError(error)) {
            Logger.error(error)

            ctx.status = 401
            ctx.body = {
                message: RES_MSG.AUTHORIZATION_ERROR,
            }

            return
        }

        throw error
    }
}

export const checkAlreadyLogin = (): Middleware => async (ctx, next) => {
    const {headers} = ctx.request

    const token = headers['authorization'] && headers['authorization'].split(' ')[1]

    try {
        await decodeUserJWT({token, errorResolve: true})

        await next()
    } catch (decoded) {
        if (isDecodedAccessToken(decoded)) {
            Logger.error(decoded)

            ctx.status = 400
            ctx.body = {
                message: RES_MSG.IS_ALREADY_LOGIN,
            }

            return
        }

        throw decoded
    }
}

interface DecodePaymentTokenArgs {
    isPaymentTokenIn?: 'body' | 'query'
}

export const decodePaymentToken =
    (args: DecodePaymentTokenArgs = {isPaymentTokenIn: 'body'}): Middleware =>
    async (ctx, next) => {
        const {isPaymentTokenIn} = args

        const {body, query} = ctx.request

        const {paymentToken} = isPaymentTokenIn === 'body' ? body : query

        if (!paymentToken) {
            ctx.status = 400
            ctx.body = {
                message: RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN,
            }

            return
        }

        try {
            const decoded = (await decodeUserJWT({token: paymentToken, errorResolve: false})) as {id: number}

            ctx.request.body = {
                paymentTokenInfo: {
                    ...decoded,
                    token: paymentToken,
                },
                ...(ctx.request.body ?? {}),
            }

            await next()
        } catch (error) {
            if (isJsonWebTokenError(error)) {
                ctx.status = 400
                ctx.body = {
                    message: RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN,
                }

                return
            }

            throw error
        }
    }

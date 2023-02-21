import {Middleware} from 'koa'
import {RES_MSG} from 'payment_common/module/constant'
import {decodeUserJWT} from 'src/@domain/user/modules/jwt'

export const authenticateAccessToken = (): Middleware => async (ctx, next) => {
    const {headers} = ctx.request

    const token = headers['authorization'] && headers['authorization'].split(' ')[1]

    if (!token) {
        ctx.status = 401

        return
    }

    const decoded = await decodeUserJWT({token, errorResolve: false})

    ctx.request.body = {
        authenticationInfo: decoded,
        ...(ctx.request.body ?? {}),
    }

    await next()
}

export const checkAlreadyLogin = (): Middleware => async (ctx, next) => {
    const {headers} = ctx.request

    const token = headers['authorization'] && headers['authorization'].split(' ')[1]

    await decodeUserJWT({token, errorResolve: true})

    await next()
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

        const {id} = (await decodeUserJWT({token: paymentToken, errorResolve: false})) as {id: number}

        ctx.request.body = {
            paymentTokenInfo: {
                id,
                token: paymentToken,
            },
            ...(ctx.request.body ?? {}),
        }

        await next()
    }

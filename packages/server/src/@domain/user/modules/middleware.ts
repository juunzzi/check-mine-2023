import {Middleware} from 'koa'
import {RES_MSG} from 'payment_common/module/constant'
import {decodeUserJWT} from 'src/@domain/user/modules/jwt'
import PaymentTokenStore from 'src/@domain/user/modules/payment-token-store'
import Logger from 'src/common/logger/winston'

export const authenticateAccessToken = (): Middleware => async (ctx, next) => {
    const {headers} = ctx.request

    try {
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
    } catch (error) {
        Logger.error(error)

        ctx.status = 401
    }
}

export const checkAlreadyLogin = (): Middleware => async (ctx, next) => {
    const {headers} = ctx.request

    try {
        const token = headers['authorization'] && headers['authorization'].split(' ')[1]

        await decodeUserJWT({token, errorResolve: true})

        await next()
    } catch (error) {
        Logger.error(error)

        ctx.status = 403
    }
}

export const decodePaymentToken = (): Middleware => async (ctx, next) => {
    const {body} = ctx.request

    try {
        const {paymentToken} = body

        if (!paymentToken) {
            ctx.status = 400

            return
        }

        const {id} = (await decodeUserJWT({token: paymentToken, errorResolve: false})) as {id: number}

        if (!PaymentTokenStore.isValidToken(id, paymentToken)) {
            ctx.status = 400

            return
        }

        ctx.request.body = {
            paymentTokenInfo: {
                id,
                token: paymentToken,
            },
            ...(ctx.request.body ?? {}),
        }

        await next()
    } catch (error) {
        Logger.error(error)

        ctx.status = 400
    } finally {
        ctx.body = {
            message: RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN,
        }
    }
}

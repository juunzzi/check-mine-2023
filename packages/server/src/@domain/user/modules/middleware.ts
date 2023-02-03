import {Middleware} from 'koa'
import {decodeAccessToken} from 'src/@domain/user/modules/jwt'
import Logger from 'src/common/logger/winston'

export const authenticateAccessToken = (): Middleware => async (ctx, next) => {
    const {headers} = ctx.request

    try {
        const token = headers['authorization'] && headers['authorization'].split(' ')[1]

        if (!token) {
            ctx.status = 401

            return
        }

        const decoded = await decodeAccessToken({token, errorResolve: false})

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

        await decodeAccessToken({token, errorResolve: true})

        await next()
    } catch (error) {
        Logger.error(error)

        ctx.status = 403
    }
}

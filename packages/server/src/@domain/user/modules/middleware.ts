import {Middleware} from 'koa'
import {decodeAccessToken} from 'src/@domain/user/modules/jwt'

export const authenticateAccessToken = (): Middleware => async (ctx, next) => {
    const {headers} = ctx.request

    try {
        const token = headers['authorization'] && headers['authorization'].split(' ')[1]

        if (!token) {
            ctx.status = 401
            return
        }

        const payload = await new Promise((resolve, reject) =>
            decodeAccessToken(token, (error, decoded) => {
                if (error) {
                    reject(error)

                    return
                }

                resolve(decoded)
            }),
        )

        ctx.request.body = payload

        await next()
    } catch (error) {
        ctx.status = 403
    }
}

export const checkAlreadyLogin = (): Middleware => async (ctx, next) => {
    const {headers} = ctx.request

    try {
        const token = headers['authorization'] && headers['authorization'].split(' ')[1]

        await new Promise((resolve, reject) =>
            decodeAccessToken(token, (error, decoded) => {
                if (decoded) {
                    reject(decoded)

                    return
                }

                resolve(error)
            }),
        )

        await next()
    } catch (error) {
        ctx.status = 403
    }
}

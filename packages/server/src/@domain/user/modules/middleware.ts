import {Middleware} from 'koa'
import {RES_MSG} from 'payment_common/module/constant'
import BarcodeSessionStore from 'src/@domain/user/modules/barcode-session-store'
import {decodeUserJWT} from 'src/@domain/user/modules/jwt'
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

export const decodeBarcodeToken = (): Middleware => async (ctx, next) => {
    const {body} = ctx.request

    try {
        const {barcode: barcodeToken} = body

        if (!barcodeToken) {
            ctx.status = 400

            return
        }

        const {id} = (await decodeUserJWT({token: barcodeToken, errorResolve: false})) as {id: number}

        if (!BarcodeSessionStore.isValidBarcode(id, barcodeToken)) {
            ctx.status = 400
            ctx.body = {
                message: RES_MSG.IS_NOT_VALID_BARCODE_TOKEN,
            }

            return
        }

        ctx.request.body = {
            barcodeInfo: {
                id,
            },
            ...(ctx.request.body ?? {}),
        }

        await next()
    } catch (error) {
        Logger.error(error)

        ctx.status = 400
    }
}

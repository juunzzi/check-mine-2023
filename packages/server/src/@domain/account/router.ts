import koaBody from 'koa-body'
import Router from 'koa-router'
import {RES_MSG} from 'payment_common/module/constant'
import ACCOUNT_SERVICE from 'src/@domain/account/service'
import {isCreateAccountBodyType, isGetAccountRequestBodyType} from 'src/@domain/account/type'
import {authenticateAccessToken} from 'src/@domain/user/modules/middleware'

const accountRouter = new Router()

accountRouter.get('/', authenticateAccessToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isGetAccountRequestBodyType(body)) {
        ctx.status = 400

        return
    }

    const {
        authenticationInfo: {id},
    } = body

    const {data: account, message} = await ACCOUNT_SERVICE.get(id)

    if (message === RES_MSG.HAS_NOT_USER_ACCOUNT || message === RES_MSG.GET_ACCOUNT_SUCCESS) {
        ctx.status = 200
        ctx.body = {
            data: {account},
        }
    } else {
        ctx.status = 400
        ctx.body = {
            message,
        }
    }
})

accountRouter.post('/', koaBody(), authenticateAccessToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isCreateAccountBodyType(body)) {
        ctx.status = 400

        return
    }

    const {
        authenticationInfo: {id},
        amount,
        bankName,
        number,
    } = body

    const {message} = await ACCOUNT_SERVICE.create({amount, bankName, number, userId: id})

    if (message === RES_MSG.CREATE_ACCOUNT_SUCCESS) {
        ctx.status = 200
    } else {
        ctx.status = 400
        ctx.body = {
            message,
        }
    }
})

export default accountRouter

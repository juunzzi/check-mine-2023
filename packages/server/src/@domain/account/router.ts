import koaBody from 'koa-body'
import Router from 'koa-router'
import {createAccount, getAccount} from 'src/@domain/account/service'
import {isCreateAccountBodyType, isGetAccountRequestBodyType} from 'src/@domain/account/type'
import {authenticateAccessToken} from 'src/@domain/user/modules/middleware'
import {RES_MSG} from 'src/common/response-message'

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

    const {data: account, message} = await getAccount(id)

    if (message === RES_MSG.SUCCESS) {
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

    const {message} = await createAccount({amount, bankName, number, userId: id})

    if (message === RES_MSG.SUCCESS) {
        ctx.status = 200
    } else {
        ctx.status = 400
        ctx.body = {
            message,
        }
    }
})

export default accountRouter

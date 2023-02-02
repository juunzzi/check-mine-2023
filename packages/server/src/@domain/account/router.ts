import koaBody from 'koa-body'
import Router from 'koa-router'
import {createAccount, getAccount} from 'src/@domain/account/service'
import {isAccountRequestBody, isCreateAccountBody} from 'src/@domain/account/type'
import {authenticateAccessToken} from 'src/@domain/user/modules/middleware'

const accountRouter = new Router()

accountRouter.get('/', authenticateAccessToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isAccountRequestBody(body)) {
        ctx.status = 400

        return
    }

    const {
        authenticationInfo: {id},
    } = body

    const account = await getAccount(id)

    if (account) {
        ctx.status = 200
        ctx.body = {
            data: account,
        }
    } else {
        ctx.status = 400
    }
})

accountRouter.post('/', koaBody(), authenticateAccessToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isCreateAccountBody(body)) {
        ctx.status = 400

        return
    }

    const {
        authenticationInfo: {id},
        amount,
        bankName,
        number,
    } = body

    const createAccountResult = await createAccount({amount, bankName, number, userId: id})

    if (createAccountResult) {
        ctx.status = 200
    } else {
        ctx.status = 400
    }
})

export default accountRouter

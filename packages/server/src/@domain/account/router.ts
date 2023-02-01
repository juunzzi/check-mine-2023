import Router from 'koa-router'
import {getAccount} from 'src/@domain/account/service'
import {isAccountRequestBody} from 'src/@domain/account/type'
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

    try {
        const {
            authenticationInfo: {id},
        } = body

        const account = await getAccount(id)

        ctx.status = 200
        ctx.body = {
            data: account,
        }
    } catch (error) {
        ctx.status = 400
    }
})

export default accountRouter

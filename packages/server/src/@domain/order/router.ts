import koaBody from 'koa-body'
import Router from 'koa-router'
import {isCreateOrderRequestBodyType} from 'src/@domain/order/type'
import {authenticateAccessToken} from 'src/@domain/user/modules/middleware'
import {RES_MSG} from 'src/common/response-message'

const orderRouter = new Router()

orderRouter.post('/', koaBody(), authenticateAccessToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isCreateOrderRequestBodyType(body)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    ctx.status = 200
})

export default orderRouter

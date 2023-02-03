import koaBody from 'koa-body'
import Router from 'koa-router'
import {createOrder} from 'src/@domain/order/service'
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

    const {
        authenticationInfo: {id},
        productsToOrder,
    } = body

    const {message} = await createOrder(id, productsToOrder)

    if (message === RES_MSG.SUCCESS) {
        ctx.status = 200
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

export default orderRouter

import koaBody from 'koa-body'
import Router from 'koa-router'
import {RES_MSG} from 'payment_common/module/constant'
import ORDER_SERVICE from 'src/@domain/order/service'
import {isCreateOrderRequestBodyType, isStartOrderRequestBody} from 'src/@domain/order/type'
import {decodePaymentToken} from 'src/@domain/user/modules/middleware'
import PaymentTokenStore from 'src/@domain/user/modules/payment-token-store'

const orderRouter = new Router()

orderRouter.post('/', koaBody(), decodePaymentToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isCreateOrderRequestBodyType(body)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {
        paymentTokenInfo: {id},
        orderProducts,
    } = body

    const {message} = await ORDER_SERVICE.create(id, orderProducts)

    if (message === RES_MSG.SUCCESS) {
        PaymentTokenStore.setStatus(id, 'success')
        ctx.status = 200
    } else {
        PaymentTokenStore.setStatus(id, 'failure')
        ctx.status = 400
        ctx.body = {message}
    }
})

orderRouter.post('/start', koaBody(), decodePaymentToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isStartOrderRequestBody(body)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {
        paymentTokenInfo: {id},
    } = body

    const message = PaymentTokenStore.setStatus(id, 'pending')

    if (message === RES_MSG.SUCCESS) {
        ctx.status = 200
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

export default orderRouter

import koaBody from 'koa-body'
import Router from 'koa-router'
import {RES_MSG} from 'payment_common/module/constant'
import ORDER_SERVICE from 'src/@domain/order/service'
import {
    isCancelOrderRequestBody,
    isCreateOrderRequestBodyType,
    isGetPaymentStatusRequestBody,
    isStartOrderRequestBody,
} from 'src/@domain/order/type'
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
        paymentTokenInfo: {id, token},
        orderProducts,
    } = body

    if (!PaymentTokenStore.isAvaiableOrderToken(id, token)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN}

        return
    }

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

orderRouter.post('/status', koaBody(), decodePaymentToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isGetPaymentStatusRequestBody(body)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {
        paymentTokenInfo: {id, token},
    } = body

    if (!PaymentTokenStore.isValidToken(id, token)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN}

        return
    }

    const status = PaymentTokenStore.getStatus(id)

    if (status !== 'nonexistent') {
        ctx.status = 200
        ctx.body = {
            data: {status},
        }
    } else {
        ctx.status = 400
        ctx.body = {message: RES_MSG.FAILURE}
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
        paymentTokenInfo: {id, token},
    } = body

    if (!PaymentTokenStore.isValidToken(id, token)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN}

        return
    }

    const message = PaymentTokenStore.setStatus(id, 'pending')

    if (message === RES_MSG.SUCCESS) {
        ctx.status = 200
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

orderRouter.post('/cancel', koaBody(), decodePaymentToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isCancelOrderRequestBody(body)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {
        paymentTokenInfo: {id, token},
    } = body

    if (!PaymentTokenStore.isValidToken(id, token)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN}

        return
    }

    const message = PaymentTokenStore.setStatus(id, 'failure')

    if (message === RES_MSG.SUCCESS) {
        ctx.status = 200
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

export default orderRouter

import koaBody from 'koa-body'
import Router from 'koa-router'
import {RES_MSG} from 'payment_common/module/constant'
import ORDER_SERVICE from 'src/@domain/order/service'
import {isCreateOrderRequestBodyType} from 'src/@domain/order/type'
import BarcodeTokenStore from 'src/@domain/user/modules/barcode-session-store'
import {decodeBarcodeToken} from 'src/@domain/user/modules/middleware'

const orderRouter = new Router()

orderRouter.post('/', koaBody(), decodeBarcodeToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isCreateOrderRequestBodyType(body)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {
        barcodeInfo: {id},
        orderProducts,
    } = body

    const {message} = await ORDER_SERVICE.create(id, orderProducts)

    if (message === RES_MSG.SUCCESS) {
        BarcodeTokenStore.breakToken(id)
        ctx.status = 200
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

export default orderRouter

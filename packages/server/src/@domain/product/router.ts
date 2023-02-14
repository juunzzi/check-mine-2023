import Router from 'koa-router'
import {RES_MSG} from 'payment_common/module/constant'
import PRODUCT_SERVICE from 'src/@domain/product/service'

const productRouter = new Router()

productRouter.get('/', async (ctx) => {
    const {data: products, message} = await PRODUCT_SERVICE.getAll()

    if (message === RES_MSG.SUCCESS) {
        ctx.status = 200
        ctx.body = {
            data: {products},
        }
    } else {
        ctx.status = 400
        ctx.body = {
            message,
        }
    }
})

export default productRouter

import Router from 'koa-router'
import {getProducts} from 'src/@domain/product/service'
import {RES_MSG} from 'src/common/response-message'

const productRouter = new Router()

productRouter.get('/', async (ctx) => {
    const {data: products, message} = await getProducts()

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

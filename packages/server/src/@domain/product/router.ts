import Router from 'koa-router'
import {getProducts} from 'src/@domain/product/service'

const productRouter = new Router()

productRouter.get('/', async (ctx) => {
    try {
        const products = await getProducts()

        ctx.status = 200
        ctx.body = {
            data: products,
        }
    } catch (error) {
        ctx.status = 400
    }
})

export default productRouter

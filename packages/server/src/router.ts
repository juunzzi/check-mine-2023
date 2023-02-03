import Router from 'koa-router'
import accountRouter from 'src/@domain/account/router'
import orderRouter from 'src/@domain/order/router'
import productRouter from 'src/@domain/product/router'
import userRouter from 'src/@domain/user/router'

const router = new Router()

router.use('/api/users', userRouter.routes())
router.use('/api/products', productRouter.routes())
router.use('/api/accounts', accountRouter.routes())
router.use('/api/orders', orderRouter.routes())

export default router

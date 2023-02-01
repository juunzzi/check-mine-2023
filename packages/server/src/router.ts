import Router from 'koa-router'
import productRouter from 'src/@domain/product/router'
import userRouter from 'src/@domain/user/router'

const router = new Router()

router.use('/users', userRouter.routes())
router.use('/products', productRouter.routes())

export default router

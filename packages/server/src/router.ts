import Router from 'koa-router'
import accountRouter from 'src/@domain/account/router'
import productRouter from 'src/@domain/product/router'
import userRouter from 'src/@domain/user/router'

const router = new Router()

router.use('/api/users', userRouter.routes())
router.use('/api/products', productRouter.routes())
router.use('/accounts', accountRouter.routes())

export default router

import Router from 'koa-router'
import userRouter from 'src/@domain/user/router'

const router = new Router()

router.use('/users', userRouter.routes())

export default router

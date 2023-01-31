import {koaBody} from 'koa-body'
import Router from 'koa-router'

const userRouter = new Router()

userRouter.get('/me', async (ctx) => {
    ctx.status = 200
})

userRouter.put('/me', koaBody(), async (ctx) => {
    ctx.status = 200
})

userRouter.post('/login', koaBody(), async (ctx) => {
    ctx.status = 200
})

userRouter.post('/join', koaBody(), async (ctx) => {
    ctx.status = 200
})

export default userRouter

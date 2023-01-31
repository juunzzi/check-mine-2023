import {koaBody} from 'koa-body'
import Router from 'koa-router'
import {createUser} from 'src/@domain/user/service'
import {isJoinRequestBodyType} from 'src/@domain/user/type'

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
    const {
        request: {body},
    } = ctx

    if (!isJoinRequestBodyType(body)) {
        ctx.status = 400
        return
    }

    try {
        await createUser({...body, accountId: null})

        ctx.status = 200
    } catch (error) {
        ctx.status = 400
    }
})

export default userRouter

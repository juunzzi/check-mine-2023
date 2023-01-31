import {koaBody} from 'koa-body'
import Router from 'koa-router'
import {checkAlreadyLogin} from 'src/@domain/user/modules/middleware'
import {createUser, loginUser} from 'src/@domain/user/service'
import {isJoinRequestBodyType, isLoginRequestBodyType} from 'src/@domain/user/type'

const userRouter = new Router()

userRouter.get('/me', async (ctx) => {
    ctx.status = 200
})

userRouter.put('/me', koaBody(), async (ctx) => {
    ctx.status = 200
})

userRouter.post('/login', koaBody(), checkAlreadyLogin(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isLoginRequestBodyType(body)) {
        ctx.status = 400
        return
    }

    try {
        const {email, password} = body

        const accessToken = await loginUser(email, password)

        ctx.status = 200
        ctx.body = {accessToken}
    } catch (error) {
        ctx.status = 400
    }
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

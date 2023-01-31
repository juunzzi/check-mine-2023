import {koaBody} from 'koa-body'
import Router from 'koa-router'
import {checkAlreadyLogin, authenticateAccessToken} from 'src/@domain/user/modules/middleware'
import {createUser, getMe, loginUser} from 'src/@domain/user/service'
import {isJoinRequestBodyType, isLoginRequestBodyType, isMeRequestBodyType} from 'src/@domain/user/type'

const userRouter = new Router()

userRouter.get('/me', authenticateAccessToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isMeRequestBodyType(body)) {
        ctx.status = 400
        return
    }

    const {id} = body

    try {
        const {email, accountId, name, payPoint} = await getMe(id)

        ctx.status = 200
        ctx.body = {
            data: {id, email, accountId, name, payPoint},
        }
    } catch (error) {
        ctx.status = 401
    }
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
        ctx.body = {data: {accessToken}}
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

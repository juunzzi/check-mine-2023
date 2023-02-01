import {koaBody} from 'koa-body'
import Router from 'koa-router'
import {checkAlreadyLogin, authenticateAccessToken} from 'src/@domain/user/modules/middleware'
import {createUser, editUser, getUser, loginUser} from 'src/@domain/user/service'
import {
    isEditMeRequestBodyType,
    isJoinRequestBodyType,
    isLoginRequestBodyType,
    isMeRequestBodyType,
} from 'src/@domain/user/type'

const userRouter = new Router()

userRouter.get('/me', authenticateAccessToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isMeRequestBodyType(body)) {
        ctx.status = 400

        return
    }

    try {
        const {
            authenticationInfo: {id},
        } = body

        const {email, accountId, name, payPoint} = await getUser(id)

        ctx.status = 200
        ctx.body = {
            data: {id, email, accountId, name, payPoint},
        }
    } catch (error) {
        ctx.status = 401
    }
})

userRouter.put('/me', koaBody(), authenticateAccessToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isEditMeRequestBodyType(body)) {
        ctx.status = 400

        return
    }

    try {
        await editUser({...body})

        ctx.status = 200
    } catch (error) {
        ctx.status = 400
    }
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

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

    const {
        authenticationInfo: {id},
    } = body

    const user = await getUser(id)

    if (user) {
        const {email, accountId, name, payPoint} = user

        ctx.status = 200
        ctx.body = {
            data: {id, email, accountId, name, payPoint},
        }
    } else {
        ctx.status = 400
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

    const editUserResult = await editUser({...body})

    if (editUserResult) {
        ctx.status = 200
    } else {
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

    const {email, password} = body

    const accessToken = await loginUser(email, password)

    if (accessToken) {
        ctx.status = 200
        ctx.body = {data: {accessToken}}
    } else {
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

    const createUserResult = await createUser({...body, accountId: null})

    if (createUserResult) {
        ctx.status = 200
    } else {
        ctx.status = 400
    }
})

export default userRouter

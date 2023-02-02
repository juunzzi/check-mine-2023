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
        ctx.body = {message: 'INPUT_TYPE_ERROR'}

        return
    }

    const {
        authenticationInfo: {id},
    } = body

    const {data: user, message} = await getUser(id)

    if (message === 'SUCCESS') {
        const {email, accountId, name, payPoint} = user

        ctx.status = 200
        ctx.body = {
            data: {id, email, accountId, name, payPoint},
        }
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

userRouter.put('/me', koaBody(), authenticateAccessToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isEditMeRequestBodyType(body)) {
        ctx.status = 400
        ctx.body = {message: 'INPUT_TYPE_ERROR'}

        return
    }

    const {data: editUserResult, message} = await editUser({...body})

    if (message === 'SUCCESS') {
        ctx.status = 200
        ctx.body = {
            data: editUserResult,
        }
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

userRouter.post('/login', koaBody(), checkAlreadyLogin(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isLoginRequestBodyType(body)) {
        ctx.status = 400
        ctx.body = {message: 'INPUT_TYPE_ERROR'}

        return
    }

    const {email, password} = body

    const {data: accessToken, message} = await loginUser(email, password)

    if (message === 'SUCCESS') {
        ctx.status = 200
        ctx.body = {data: {accessToken}}
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

userRouter.post('/join', koaBody(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isJoinRequestBodyType(body)) {
        ctx.status = 400
        ctx.body = {message: 'INPUT_TYPE_ERROR'}

        return
    }

    const {data: createUserResult, message} = await createUser({...body, accountId: null})

    if (message === 'SUCCESS') {
        ctx.status = 200
        ctx.body = {
            data: createUserResult,
        }
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

export default userRouter

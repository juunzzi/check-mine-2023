import {koaBody} from 'koa-body'
import Router from 'koa-router'
import {RES_MSG} from 'payment_common/module/constant'
import {checkAlreadyLogin, authenticateAccessToken} from 'src/@domain/user/modules/middleware'
import PaymentTokenStore from 'src/@domain/user/modules/payment-token-store'
import USER_SERVICE from 'src/@domain/user/service'
import {
    isEditMeRequestBodyType,
    isJoinRequestBodyType,
    isLoginRequestBodyType,
    isGetMeRequestBodyType,
    isGetPaymentTokenRequestBodyType,
} from 'src/@domain/user/type'

const userRouter = new Router()

userRouter.get('/me', authenticateAccessToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isGetMeRequestBodyType(body)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {
        authenticationInfo: {id},
    } = body

    const {data: user, message} = await USER_SERVICE.get(id)

    if (message === RES_MSG.SUCCESS) {
        const {email, accountId, name, payPoint} = user

        ctx.status = 200
        ctx.body = {
            data: {
                id,
                email,
                accountId,
                name,
                payPoint,
                payment: {
                    status: PaymentTokenStore.getStatus(id),
                },
            },
        }
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

userRouter.get('/me/payment-token', authenticateAccessToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isGetPaymentTokenRequestBodyType(body)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {
        authenticationInfo: {id},
    } = body

    const {data: paymentToken, message} = await USER_SERVICE.getPaymentToken(id)

    if (message === RES_MSG.SUCCESS) {
        PaymentTokenStore.setToken(id, paymentToken)

        ctx.status = 200
        ctx.body = {
            data: {paymentToken},
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
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {message} = await USER_SERVICE.edit({...body})

    if (message === RES_MSG.SUCCESS) {
        ctx.status = 200
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
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {email, password} = body

    const {data: accessToken, message} = await USER_SERVICE.login(email, password)

    if (message === RES_MSG.SUCCESS) {
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
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {message} = await USER_SERVICE.join({...body, accountId: null})

    if (message === RES_MSG.SUCCESS) {
        ctx.status = 200
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

export default userRouter

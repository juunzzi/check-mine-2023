import {koaBody} from 'koa-body'
import Router from 'koa-router'
import {RES_MSG} from 'payment_common/module/constant'
import {checkAlreadyLogin, authenticateAccessToken, decodePaymentToken} from 'src/@domain/user/modules/middleware'
import PaymentTokenStore from 'src/@domain/user/modules/payment-token-store'
import USER_SERVICE from 'src/@domain/user/service'
import {
    isEditMeRequestBodyType,
    isJoinRequestBodyType,
    isLoginRequestBodyType,
    isGetMeRequestBodyType,
    isGetPaymentTokenRequestBodyType,
    isStartOrderRequestBody,
    isGetPaymentStatusRequestBody,
    isCancelOrderRequestBody,
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

    if (message === RES_MSG.GET_USER_SUCCESS) {
        const {email, accountId, name, payPoint} = user

        ctx.status = 200
        ctx.body = {
            data: {
                id,
                email,
                accountId,
                name,
                payPoint,
            },
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

    if (message === RES_MSG.EDIT_USER_SUCCESS) {
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

    if (message === RES_MSG.LOGIN_USER_SUCCESS) {
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

    if (message === RES_MSG.JOIN_USER_SUCCESS) {
        ctx.status = 200
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

userRouter.post('/me/payment-token', authenticateAccessToken(), async (ctx) => {
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

    const {data: paymentToken, message} = await USER_SERVICE.generatePaymentToken(id)

    if (message === RES_MSG.GENERATE_PAYMENT_TOKEN_SUCCESS) {
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

userRouter.get('/me/payment-token/status', koaBody(), decodePaymentToken({isPaymentTokenIn: 'query'}), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isGetPaymentStatusRequestBody(body)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {
        paymentTokenInfo: {id, token},
    } = body

    if (!PaymentTokenStore.isValidToken(id, token)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN}

        return
    }

    const status = PaymentTokenStore.getStatus(id)

    if (status !== 'nonexistent') {
        ctx.status = 200
        ctx.body = {
            data: {status},
        }
    } else {
        ctx.status = 400
        ctx.body = {message: RES_MSG.HAS_NOT_PAYMENT_TOKEN}
    }
})

userRouter.post('/me/payment-token/start', koaBody(), decodePaymentToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isStartOrderRequestBody(body)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {
        paymentTokenInfo: {id, token},
    } = body

    if (!PaymentTokenStore.isAvaiableOrderToken(id, token)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN}

        return
    }

    const message = PaymentTokenStore.setPendingStatus(id)

    if (message === RES_MSG.SET_PAYMENT_TOKEN_STATUS_SUCCESS) {
        ctx.status = 200
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

userRouter.post('/me/payment-token/cancel', koaBody(), decodePaymentToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isCancelOrderRequestBody(body)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {
        paymentTokenInfo: {id, token},
    } = body

    if (!PaymentTokenStore.isValidToken(id, token)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.IS_NOT_VALID_PAYMENT_TOKEN}

        return
    }

    const message = PaymentTokenStore.setSuccessOrFailureStatus(id, 'failure')

    if (message === RES_MSG.SET_PAYMENT_TOKEN_STATUS_SUCCESS) {
        ctx.status = 200
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})
export default userRouter

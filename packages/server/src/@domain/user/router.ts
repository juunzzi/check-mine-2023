import {koaBody} from 'koa-body'
import Router from 'koa-router'
import {RES_MSG} from 'payment_common'
import {checkAlreadyLogin, authenticateAccessToken} from 'src/@domain/user/modules/middleware'
import {editUser, getBarcode, getUser, joinUser, loginUser} from 'src/@domain/user/service'
import {
    isEditMeRequestBodyType,
    isJoinRequestBodyType,
    isLoginRequestBodyType,
    isGetMeRequestBodyType,
    isGetBarcodeTokenRequestBodyType,
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

    const {data: user, message} = await getUser(id)

    if (message === RES_MSG.SUCCESS) {
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

userRouter.get('/me/barcode', authenticateAccessToken(), async (ctx) => {
    const {
        request: {body},
    } = ctx

    if (!isGetBarcodeTokenRequestBodyType(body)) {
        ctx.status = 400
        ctx.body = {message: RES_MSG.INPUT_TYPE_ERROR}

        return
    }

    const {
        authenticationInfo: {id},
    } = body

    const {data: barcodeToken, message} = getBarcode(id)

    if (message === RES_MSG.SUCCESS) {
        ctx.status = 200
        ctx.body = {
            data: {barcodeToken},
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

    const {message} = await editUser({...body})

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

    const {data: accessToken, message} = await loginUser(email, password)

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

    const {message} = await joinUser({...body, accountId: null})

    if (message === RES_MSG.SUCCESS) {
        ctx.status = 200
    } else {
        ctx.status = 400
        ctx.body = {message}
    }
})

export default userRouter

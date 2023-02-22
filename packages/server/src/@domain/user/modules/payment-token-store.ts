import {RES_MSG} from 'payment_common/module/constant'

export type PaymentTokenStatus = 'initialize' | 'pending' | 'success' | 'failure'

export interface PaymentTokenData {
    token: string
    status: PaymentTokenStatus
}

const PENDING_STATUS_EXPIRED_TIME = 360000

const SUCCESS_OR_FAILURE_EXPIRED_TIME = 60000

const PaymentTokenStore = (() => {
    const timeout = {} as Record<number, NodeJS.Timeout>

    const store = {} as Record<number, PaymentTokenData>

    return {
        setToken: (id: number, token: string) => {
            clearTimeout(timeout[id])

            store[id] = {
                token,
                status: 'initialize',
            }

            return RES_MSG.SET_PAYMENT_TOKEN_SUCCESS
        },
        setPendingStatus: (id: number) => {
            if (!store[id]) {
                return RES_MSG.SET_PAYMENT_TOKEN_STATUS_FAILURE
            }

            store[id] = {
                ...store[id],
                status: 'pending',
            }

            clearTimeout(timeout[id])

            timeout[id] = setTimeout(() => {
                store[id] = {
                    ...store[id],
                    status: 'failure',
                }
            }, PENDING_STATUS_EXPIRED_TIME)

            return RES_MSG.SET_PAYMENT_TOKEN_STATUS_SUCCESS
        },
        setSuccessOrFailureStatus: (id: number, status: 'success' | 'failure') => {
            if (!store[id]) {
                return RES_MSG.SET_PAYMENT_TOKEN_STATUS_FAILURE
            }

            store[id] = {
                ...store[id],
                status,
            }

            clearTimeout(timeout[id])

            timeout[id] = setTimeout(() => {
                delete store[id]
            }, SUCCESS_OR_FAILURE_EXPIRED_TIME)

            return RES_MSG.SET_PAYMENT_TOKEN_STATUS_SUCCESS
        },
        getStatus: (id: number) => {
            if (!store[id]) {
                return 'nonexistent'
            }

            return store[id].status
        },

        getToken: (id: number) => {
            if (!store[id]) {
                return 'nonexistent'
            }

            return store[id].token
        },
        isValidToken: (id: number, token: string) => {
            return store[id] && store[id].token === token
        },
        isAvaiableOrderToken: (id: number, token: string) => {
            return (
                store[id] &&
                store[id].token === token &&
                (store[id].status === 'initialize' || store[id].status === 'pending')
            )
        },
    }
})()

export default PaymentTokenStore

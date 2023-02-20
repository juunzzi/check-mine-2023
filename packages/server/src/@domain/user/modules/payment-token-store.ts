import {RES_MSG} from 'payment_common/module/constant'

export type PaymentTokenStatus = 'initialize' | 'pending' | 'success' | 'failure'

export interface PaymentTokenData {
    token: string
    status: PaymentTokenStatus
}

const PENDING_STATUS_EXPIRED_TIME = 360000

const PaymentTokenStore = (() => {
    const timeout = {} as Record<number, NodeJS.Timeout>

    const store = {} as Record<number, PaymentTokenData>

    return {
        setToken: (id: number, token: string) => {
            store[id] = {
                token,
                status: 'initialize',
            }

            return RES_MSG.SUCCESS
        },
        setStatus: (id: number, status: PaymentTokenStatus) => {
            if (!store[id]) {
                return RES_MSG.FAILURE
            }

            if (status === 'pending') {
                store[id] = {
                    ...store[id],
                    status,
                }

                clearTimeout(timeout[id])

                timeout[id] = setTimeout(() => {
                    store[id] = {
                        ...store[id],
                        status: 'failure',
                    }
                }, PENDING_STATUS_EXPIRED_TIME)

                return RES_MSG.SUCCESS
            }

            store[id] = {
                ...store[id],
                status,
            }

            return RES_MSG.SUCCESS
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
            return (
                store[id] &&
                store[id].token === token &&
                (store[id].status === 'initialize' || store[id].status === 'pending')
            )
        },
    }
})()

export default PaymentTokenStore

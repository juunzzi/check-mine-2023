import {client} from 'src/@domain/api'
import {OrderProduct} from 'src/@domain/types/order'
import {PaymentTokenStatus} from 'src/@domain/types/user'

export type CreateOrderRequestBody = {
    paymentToken: string | null
    orderProducts: Omit<OrderProduct, 'amount'>[]
}
export type CreateOrderResponseBody = undefined

export type StartOrderRequestBody = {
    paymentToken: string | null
}
export type StartOrderResponseBody = undefined

export type CancelOrderRequestBody = {
    paymentToken: string | null
}
export type CancelOrderResponseBody = undefined

export type GetPaymentStatusRequestBody = {
    paymentToken: string | null
}
export type GetPaymentStatusResponseBody = {
    data: {
        status: PaymentTokenStatus
    }
}

const ORDER_API = {
    create: async (body: CreateOrderRequestBody) => {
        const {data} = await client.post<CreateOrderResponseBody>('/orders', body)

        return data
    },
    start: async (body: StartOrderRequestBody) => {
        const {data} = await client.post<StartOrderResponseBody>('/orders/start', body)

        return data
    },
    cancel: async (body: CancelOrderRequestBody) => {
        const {data} = await client.post<CancelOrderResponseBody>('/orders/cancel', body)

        return data
    },
    getStatus: async (body: GetPaymentStatusRequestBody) => {
        const {data} = await client.post<GetPaymentStatusResponseBody>('/orders/status', body)

        return data
    },
}

export default ORDER_API

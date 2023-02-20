import {client} from 'src/@domain/api'
import {OrderProduct} from 'src/@domain/types/order'

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
}

export default ORDER_API

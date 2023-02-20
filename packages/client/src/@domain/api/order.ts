import {client} from 'src/@domain/api'
import {OrderProduct} from 'src/@domain/types/order'

export type CreateOrderRequestBody = {
    paymentToken: string | null
    orderProducts: Omit<OrderProduct, 'amount'>[]
}
export type CreateOrderResponseBody = undefined

export type OrderStartRequestBody = {
    paymentToken: string | null
}
export type OrderStartResponseBody = undefined

const ORDER_API = {
    create: async (body: CreateOrderRequestBody) => {
        const {data} = await client.post<CreateOrderResponseBody>('/orders', body)

        return data
    },
    start: async (body: OrderStartRequestBody) => {
        const {data} = await client.post<OrderStartResponseBody>('/orders/start', body)

        return data
    },
}

export default ORDER_API

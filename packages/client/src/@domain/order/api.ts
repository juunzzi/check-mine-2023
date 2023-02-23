import {client} from 'src/@domain/module/api'
import {OrderProduct} from 'src/@domain/order/types'

export type CreateOrderRequestBody = {
    paymentToken: string | null
    orderProducts: Omit<OrderProduct, 'amount'>[]
}
export type CreateOrderResponseBody = undefined

const ORDER_API = {
    create: async (body: CreateOrderRequestBody) => {
        const {data} = await client.post<CreateOrderResponseBody>('/orders', body)

        return data
    },
}

export default ORDER_API

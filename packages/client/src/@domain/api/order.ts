import {client} from 'src/@domain/api'
import {OrderProduct} from 'src/@domain/types/order'

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

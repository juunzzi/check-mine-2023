import {OrderProduct, OrderProductMap} from 'src/@domain/order/type'
import {Product} from 'src/@domain/product/type'

export const computeOrderAmount = (products: Product[], orderProductMap: OrderProductMap) => {
    return products.reduce((prev, {id, price}) => {
        if (orderProductMap[id]) {
            const {quantity} = orderProductMap[id]

            return prev + price * quantity
        }

        return prev
    }, 0)
}

export const parseOrderProducts = (orderProducts: OrderProduct[]) => {
    return orderProducts.reduce<{
        orderProductMap: OrderProductMap
        productIds: number[]
    }>(
        (prev, {id, quantity}) => ({
            ...prev,
            orderProductMap: {...prev.orderProductMap, [id]: {id, quantity}},
            productIds: [...prev.productIds, id],
        }),
        {orderProductMap: {}, productIds: []},
    )
}

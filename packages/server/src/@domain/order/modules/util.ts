import {ProductsToOrderMap} from 'src/@domain/order/service'
import {ProductToOrder} from 'src/@domain/order/type'
import {Product} from 'src/@domain/product/type'

export const computeOrderAmount = (products: Product[], productsToOrderMap: ProductsToOrderMap) => {
    return products.reduce((prev, {id, price}) => {
        if (productsToOrderMap[id]) {
            const {quantity} = productsToOrderMap[id]

            return prev + price * quantity
        }

        return prev
    }, 0)
}

export const parseProductsToOrder = (productsToOrder: ProductToOrder[]) => {
    return productsToOrder.reduce<{
        productsToOrderMap: ProductsToOrderMap
        productIds: number[]
    }>(
        (prev, {id, quantity}) => ({
            ...prev,
            productsToOrderMap: {...prev.productsToOrderMap, [id]: {id, quantity}},
            productIds: [...prev.productIds, id],
        }),
        {productsToOrderMap: {}, productIds: []},
    )
}

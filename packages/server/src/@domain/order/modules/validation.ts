import {OrderProduct} from 'src/@domain/order/type'
import {Product} from 'src/@domain/product/type'

export const checkProductsAvailableForOrder = (products: Product[], orderProducts: OrderProduct[]) => {
    return orderProducts.every((productToOrder) => {
        const {id, quantity} = productToOrder

        const foundProduct = products.find((product) => product.id === id)

        return foundProduct && foundProduct.stock >= quantity
    })
}

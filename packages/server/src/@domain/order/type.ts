import {BarcodeInfo, isBarcodeInfo} from 'src/@domain/user/type'

export type ProductToOrder = {
    id: number
    quantity: number
}

export const isProductToOrder = (productToOrder: any): productToOrder is ProductToOrder => {
    return productToOrder && typeof productToOrder.id === 'number' && typeof productToOrder.quantity === 'number'
}
export interface CreateOrderRequestBody {
    barcodeInfo: BarcodeInfo
    productsToOrder: ProductToOrder[]
}

export const isCreateOrderRequestBodyType = (body: any): body is CreateOrderRequestBody => {
    return (
        body &&
        body.productsToOrder &&
        body.productsToOrder.every((productToOrder: any) => isProductToOrder(productToOrder)) &&
        isBarcodeInfo(body.barcodeInfo)
    )
}

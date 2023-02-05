import {BarcodeInfo, isBarcodeInfo} from 'src/@domain/user/type'

export type OrderProduct = {
    id: number
    quantity: number
}

export interface OrderProductMap {
    [id: number]: OrderProduct
}

export const isOrderProduct = (order: any): order is OrderProduct => {
    return order && typeof order.id === 'number' && typeof order.quantity === 'number'
}
export interface CreateOrderRequestBody {
    barcodeInfo: BarcodeInfo
    orderProducts: OrderProduct[]
}

export const isCreateOrderRequestBodyType = (body: any): body is CreateOrderRequestBody => {
    return (
        body &&
        body.orderProducts &&
        body.orderProducts.every((order: any) => isOrderProduct(order)) &&
        isBarcodeInfo(body.barcodeInfo)
    )
}

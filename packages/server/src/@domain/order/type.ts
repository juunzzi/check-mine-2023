import {isPaymentTokenInfo, PaymentTokenInfo} from 'src/@domain/user/type'
import {isNumberType} from 'src/common/type/guard'

export type OrderProduct = {
    id: number
    quantity: number
}

export interface OrderProductMap {
    [id: number]: OrderProduct
}

export const isOrderProductType = (orderProduct: any): orderProduct is OrderProduct => {
    return orderProduct && isNumberType(orderProduct.id) && isNumberType(orderProduct.quantity)
}
export interface CreateOrderRequestBody {
    paymentTokenInfo: PaymentTokenInfo
    orderProducts: OrderProduct[]
}

export const isCreateOrderRequestBodyType = (body: any): body is CreateOrderRequestBody => {
    return (
        body &&
        body.orderProducts &&
        body.orderProducts.every((order: any) => isOrderProductType(order)) &&
        isPaymentTokenInfo(body.paymentTokenInfo)
    )
}

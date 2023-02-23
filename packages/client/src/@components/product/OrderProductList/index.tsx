import {Suspense} from 'react'
import OrderProductItem from 'src/@components/product/OrderProductItem'
import OrderProductListLoadingFallback from 'src/@components/product/OrderProductList/loading-fallback'
import {OrderProduct} from 'src/@domain/order/types'
import {useFetchProducts} from 'src/@domain/product/hooks'
import {OrderProductMapState} from 'src/@pages/order/hooks'

import * as Styled from './style'

interface OrderProductListProps {
    orderProductsMap: OrderProductMapState
    changeProductQuantity: (args: OrderProduct) => void
}

const NakedOrderProductList = (props: OrderProductListProps) => {
    const {orderProductsMap, changeProductQuantity} = props

    const {products} = useFetchProducts()

    return (
        <Styled.OrderProductItemWrapper>
            {products &&
                products.map((product) => {
                    const quantity = orderProductsMap[product.id]?.quantity ?? 0

                    return (
                        <OrderProductItem
                            key={product.id}
                            quantity={quantity}
                            changeProductQuantity={changeProductQuantity}
                            {...product}
                        />
                    )
                })}
        </Styled.OrderProductItemWrapper>
    )
}

const OrderProductList = (props: OrderProductListProps) => {
    return (
        <Suspense fallback={<OrderProductListLoadingFallback />}>
            <NakedOrderProductList {...props} />
        </Suspense>
    )
}

export default OrderProductList

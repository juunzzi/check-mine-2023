import {Suspense} from 'react'
import OrderProductItem from 'src/@components/product/OrderProductItem'
import OrderProductListLoadingFallback from 'src/@components/product/OrderProductList/loading-fallback'
import {useFetchProducts} from 'src/@domain/hooks/product'
import {OrderProduct} from 'src/@domain/types/order'
import {OrderProductMapState} from 'src/@pages/order/hooks'

import * as Styled from './style'

interface OrderProductListProps {
    orderProductsMap: OrderProductMapState
    changeProductQuantity: (args: OrderProduct) => void
}

const OrderProductListNaked = (props: OrderProductListProps) => {
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
            <OrderProductListNaked {...props} />
        </Suspense>
    )
}

export default OrderProductList

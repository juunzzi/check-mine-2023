import {Suspense} from 'react'
import {Navigate} from 'react-router-dom'
import Button from 'src/@components/common/Button'
import PageTemplate from 'src/@components/common/PageTemplate'
import OrderProductItem from 'src/@components/product/OrderProductItem'
import {useOrderPage} from 'src/@pages/order/hooks'
import OrderPageLoadingFallback from 'src/@pages/order/loading-fallback'
import useSearchParams from 'src/common/hooks/useSearchParams'
import {PATH} from 'src/Router'

import * as Styled from './style'

const NonProtectedOrderPage = () => {
    const {
        state: {orderProductsMap, products},
        handler: {changeProductQuantity, submitCreateOrder},
        etc: {amount},
    } = useOrderPage()

    return (
        <PageTemplate>
            <Styled.Container>
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
                <Styled.OrderButtonWrapper>
                    <Button onClick={submitCreateOrder}>총 결제 금액 : {amount?.toLocaleString('ko-kr')}원</Button>
                </Styled.OrderButtonWrapper>
            </Styled.Container>
        </PageTemplate>
    )
}

const OrderPage = () => {
    const token = useSearchParams('qrcode')

    if (!token || prompt('비밀번호를 입력해주세요') !== process.env.REACT_APP_CUSTOMER_KEY) {
        return <Navigate to={PATH.MAIN} />
    }

    return (
        <Suspense fallback={<OrderPageLoadingFallback />}>
            <NonProtectedOrderPage />
        </Suspense>
    )
}

export default OrderPage

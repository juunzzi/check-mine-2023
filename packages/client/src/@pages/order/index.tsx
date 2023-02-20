import {Navigate} from 'react-router-dom'
import Button from 'src/@components/common/Button'
import PageTemplate from 'src/@components/common/PageTemplate'
import OrderProductList from 'src/@components/product/OrderProductList'
import {useOrderPage} from 'src/@pages/order/hooks'
import useSearchParams from 'src/common/hooks/useSearchParams'
import {PATH} from 'src/Router'

import * as Styled from './style'

const NonProtectedOrderPage = () => {
    const {
        state: {orderProductsMap},
        handler: {changeProductQuantity, submitCreateOrder},
        etc: {totalAmount},
    } = useOrderPage()

    return (
        <PageTemplate>
            <Styled.Container>
                <OrderProductList orderProductsMap={orderProductsMap} changeProductQuantity={changeProductQuantity} />
                <Styled.OrderButtonWrapper>
                    <Button onClick={submitCreateOrder}>총 결제 금액 : {totalAmount?.toLocaleString('ko-kr')}원</Button>
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

    return <NonProtectedOrderPage />
}

export default OrderPage

import {Navigate} from 'react-router-dom'
import Button from 'src/@components/common/Button'
import ErrorBoundary from 'src/@components/common/ErrorBoundary'
import PageTemplate from 'src/@components/common/PageTemplate'
import OrderFailureModal from 'src/@components/order/OrderFailureModal'
import OrderSuccessModal from 'src/@components/order/OrderSuccessModal'
import OrderProductList from 'src/@components/product/OrderProductList'
import OrderPageErrorFallback from 'src/@pages/order/error-fallback'
import {useOrderPage} from 'src/@pages/order/hooks'
import useSearchParams from 'src/common/hooks/useSearchParams'
import {PATH} from 'src/Router'

import * as Styled from './style'

const NonProtectedOrderPage = () => {
    const {
        state: {isShowSuccessModal, isShowFailureModal, orderProductsMap},
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
            {isShowSuccessModal && <OrderSuccessModal />}
            {isShowFailureModal && <OrderFailureModal />}
        </PageTemplate>
    )
}

const OrderPage = () => {
    const token = useSearchParams('qrcode')

    if (!token || prompt('비밀번호를 입력해주세요') !== process.env.REACT_APP_CUSTOMER_KEY) {
        return <Navigate to={PATH.MAIN} />
    }

    return (
        <ErrorBoundary fallback={OrderPageErrorFallback}>
            <NonProtectedOrderPage />
        </ErrorBoundary>
    )
}

export default OrderPage

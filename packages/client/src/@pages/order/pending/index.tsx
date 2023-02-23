import ErrorBoundary from 'src/@components/common/ErrorBoundary'
import Icon, {XIcon} from 'src/@components/common/Icon'
import PageTemplate from 'src/@components/common/PageTemplate'
import OrderPendingPageErrorFallback from 'src/@pages/order/pending/error-fallback'
import {useOrderPendingPage} from 'src/@pages/order/pending/hooks'

import * as Styled from './style'

const NakedOrderPendingPage = () => {
    const {
        handler: {onClickCancelButton},
    } = useOrderPendingPage()

    return (
        <PageTemplate>
            <Styled.Container>
                <Styled.OrderStatus>결제가 진행 중이에요.</Styled.OrderStatus>
                <Styled.ButtonWrapper>
                    <Styled.Button onClick={onClickCancelButton}>
                        <Icon icon={XIcon} size={22} />
                        <span>결제 취소</span>
                    </Styled.Button>
                </Styled.ButtonWrapper>
            </Styled.Container>
        </PageTemplate>
    )
}

const OrderPendingPage = () => {
    return (
        <ErrorBoundary fallback={OrderPendingPageErrorFallback}>
            <NakedOrderPendingPage />
        </ErrorBoundary>
    )
}

export default OrderPendingPage

import Icon, {XIcon} from 'src/@components/common/Icon'
import PageTemplate from 'src/@components/common/PageTemplate'
import {useOrderPendingPage} from 'src/@pages/order/pending/hooks'

import * as Styled from './style'

const OrderPendingPage = () => {
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

export default OrderPendingPage

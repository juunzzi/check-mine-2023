import {ErrorBoundaryFallbackProps} from 'src/@components/common/ErrorBoundary'
import Icon, {MainIcon} from 'src/@components/common/Icon'
import PageTemplate from 'src/@components/common/PageTemplate'
import {PATH} from 'src/Router'

import * as Styled from './style'

const OrderPendingPageErrorFallback = (props: ErrorBoundaryFallbackProps) => {
    const {resetErrorState} = props

    const onClickMainButton = () => {
        resetErrorState()
    }

    return (
        <PageTemplate>
            <Styled.Container>
                <Styled.ErrorMessage>결제 정보에 문제가 생겼어요.</Styled.ErrorMessage>
                <Styled.ButtonWrapper>
                    <Styled.LinkButton to={PATH.MAIN} onClick={onClickMainButton}>
                        <Icon icon={MainIcon} size={28} />
                        <span>메인으로</span>
                    </Styled.LinkButton>
                </Styled.ButtonWrapper>
            </Styled.Container>
        </PageTemplate>
    )
}

export default OrderPendingPageErrorFallback

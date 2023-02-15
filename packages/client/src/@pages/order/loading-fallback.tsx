import ButtonLoadingFallback from 'src/@components/common/Button/loading-fallback'
import PageTemplateLoadingFallback from 'src/@components/common/PageTemplate/loading-fallback'
import Placeholder from 'src/@components/common/Placeholder'

import * as Styled from './style'

const OrderPageLoadingFallback = () => {
    return (
        <PageTemplateLoadingFallback>
            <Styled.Container>
                <Styled.OrderProductItemWrapper>
                    <Placeholder width="100%" height="100px" />
                    <Placeholder width="100%" height="100px" />
                    <Placeholder width="100%" height="100px" />
                    <Placeholder width="100%" height="100px" />
                </Styled.OrderProductItemWrapper>
                <Styled.OrderButtonWrapper>
                    <ButtonLoadingFallback />
                </Styled.OrderButtonWrapper>
            </Styled.Container>
        </PageTemplateLoadingFallback>
    )
}

export default OrderPageLoadingFallback

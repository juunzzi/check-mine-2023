import ButtonLoadingFallback from 'src/@components/common/Button/loading-fallback'
import PageTemplateLoadingFallback from 'src/@components/common/PageTemplate/loading-fallback'
import OrderProductListLoadingFallback from 'src/@components/product/OrderProductList/loading-fallback'

import * as Styled from './style'

const OrderPageLoadingFallback = () => {
    return (
        <PageTemplateLoadingFallback>
            <Styled.Container>
                <OrderProductListLoadingFallback />
                <Styled.OrderButtonWrapper>
                    <ButtonLoadingFallback />
                </Styled.OrderButtonWrapper>
            </Styled.Container>
        </PageTemplateLoadingFallback>
    )
}

export default OrderPageLoadingFallback

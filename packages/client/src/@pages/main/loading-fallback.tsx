import PageTemplateLoadingFallback from 'src/@components/common/PageTemplate/loading-fallback'
import UserPaymentLoadingFallback from 'src/@components/user/UserPayment/loading-fallback'

import * as Styled from './style'

const MainPageLoadingFallback = () => {
    return (
        <PageTemplateLoadingFallback>
            <Styled.Container>
                <Styled.UserPaymentContainer>
                    <UserPaymentLoadingFallback />
                </Styled.UserPaymentContainer>
            </Styled.Container>
        </PageTemplateLoadingFallback>
    )
}

export default MainPageLoadingFallback

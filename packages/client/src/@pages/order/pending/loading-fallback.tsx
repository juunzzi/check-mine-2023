import PageTemplateLoadingFallback from 'src/@components/common/PageTemplate/loading-fallback'
import Placeholder from 'src/@components/common/Placeholder'

import * as Styled from './style'

const OrderPendingPageLoadingFallback = () => {
    return (
        <PageTemplateLoadingFallback>
            <Styled.Container>
                <Placeholder width="200px" height="100px" />
                <Placeholder width="50px" height="50px" />
            </Styled.Container>
        </PageTemplateLoadingFallback>
    )
}

export default OrderPendingPageLoadingFallback

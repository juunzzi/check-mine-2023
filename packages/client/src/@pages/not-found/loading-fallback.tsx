import PageTemplateLoadingFallback from 'src/@components/common/PageTemplate/loading-fallback'
import Placeholder from 'src/@components/common/Placeholder'

import * as Styled from './style'

const NotFoundPageLoadingFallback = () => {
    return (
        <PageTemplateLoadingFallback>
            <Styled.Container>
                <Placeholder width="200px" height="200px" />
            </Styled.Container>
        </PageTemplateLoadingFallback>
    )
}

export default NotFoundPageLoadingFallback

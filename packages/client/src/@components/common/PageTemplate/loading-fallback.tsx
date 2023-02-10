import {PropsWithChildren} from 'react'
import HeaderLoadingFallback from 'src/@components/common/Header/loading-fallback'

import * as Styled from './style'

const PageTemplateLoadingFallback = ({children}: PropsWithChildren) => {
    return (
        <Styled.Container>
            <Styled.Inner>
                <HeaderLoadingFallback />
                {children}
            </Styled.Inner>
        </Styled.Container>
    )
}

export default PageTemplateLoadingFallback

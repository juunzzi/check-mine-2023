import {PropsWithChildren} from 'react'
import Header from 'src/@components/common/Header'

import * as Styled from './style'

interface PageTemplateProps {
    hasHeader?: boolean
}

const PageTemplate = ({children, hasHeader = true}: PropsWithChildren<PageTemplateProps>) => {
    return (
        <Styled.Container>
            <Styled.Inner>
                {hasHeader && <Header />}
                {children}
            </Styled.Inner>
        </Styled.Container>
    )
}

export default PageTemplate

import {PropsWithChildren} from 'react'
import Header from 'src/@components/common/Header'

import * as Styled from './style'

const PageTemplate = ({children}: PropsWithChildren) => {
    return (
        <Styled.Container>
            <Styled.Inner>
                <Header />
                {children}
            </Styled.Inner>
        </Styled.Container>
    )
}

export default PageTemplate

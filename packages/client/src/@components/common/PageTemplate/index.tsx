import {PropsWithChildren} from 'react'
import Header from 'src/@components/common/Header'

import * as Style from './style'

const PageTemplate = ({children}: PropsWithChildren) => {
    return (
        <Style.Container>
            <Style.Inner>
                <Header />
                {children}
            </Style.Inner>
        </Style.Container>
    )
}

export default PageTemplate

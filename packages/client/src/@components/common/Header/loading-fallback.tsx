import Placeholder from 'src/@components/common/Placeholder'

import * as Styled from './style'

const HeaderLoadingFallback = () => {
    return (
        <Styled.Container>
            <Placeholder width="40px" height="40px" />
            <Placeholder width="40px" height="40px" />
        </Styled.Container>
    )
}

export default HeaderLoadingFallback

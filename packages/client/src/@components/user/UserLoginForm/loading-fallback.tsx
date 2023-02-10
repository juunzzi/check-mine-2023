import ButtonLoadingFallback from 'src/@components/common/Button/loading-fallback'
import InputLoadingFallback from 'src/@components/common/Input/loading-fallback'

import * as Styled from './style'

const UserLoginFormLoadingFallback = () => {
    return (
        <Styled.FormConainer>
            <InputLoadingFallback />
            <InputLoadingFallback />
            <ButtonLoadingFallback />
        </Styled.FormConainer>
    )
}

export default UserLoginFormLoadingFallback

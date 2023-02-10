import ButtonLoadingFallback from 'src/@components/common/Button/loading-fallback'
import InputLoadingFallback from 'src/@components/common/Input/loading-fallback'

import * as Style from './style'

const UserJoinFormLoadingFallback = () => {
    return (
        <Style.FormConainer>
            <InputLoadingFallback />
            <InputLoadingFallback />
            <InputLoadingFallback />
            <InputLoadingFallback />
            <ButtonLoadingFallback />
        </Style.FormConainer>
    )
}

export default UserJoinFormLoadingFallback

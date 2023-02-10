import PageTemplate from 'src/@components/common/PageTemplate'
import Placeholder from 'src/@components/common/Placeholder'
import UserLoginFormLoadingFallback from 'src/@components/user/UserLoginForm/loading-fallback'

import * as Styled from './style'

const LoginPageLoadingFallback = () => {
    return (
        <PageTemplate>
            <Styled.Container>
                <Placeholder width="15%" height="30px" />
                <UserLoginFormLoadingFallback />
                <Placeholder width="25%" height="30px" />
            </Styled.Container>
        </PageTemplate>
    )
}

export default LoginPageLoadingFallback

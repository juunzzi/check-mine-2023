import PageTemplate from 'src/@components/common/PageTemplate'
import Placeholder from 'src/@components/common/Placeholder'
import UserJoinFormLoadingFallback from 'src/@components/user/UserJoinForm/loading-fallback'

import * as Styled from './style'

const JoinPageLoadingFallback = () => {
    return (
        <PageTemplate>
            <Styled.Container>
                <Placeholder width="15%" height="30px" />
                <UserJoinFormLoadingFallback />
                <Placeholder width="25%" height="30px" />
            </Styled.Container>
        </PageTemplate>
    )
}

export default JoinPageLoadingFallback

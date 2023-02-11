import AccountCreateFormLoadingFallback from 'src/@components/account/AccountCreateForm/loading-fallback'
import PageTemplateLoadingFallback from 'src/@components/common/PageTemplate/loading-fallback'
import Placeholder from 'src/@components/common/Placeholder'

import * as Styled from './style'

const AccountCreatePageLoadingFallback = () => {
    return (
        <PageTemplateLoadingFallback>
            <Styled.Container>
                <Placeholder width="15%" height="30px" />
                <AccountCreateFormLoadingFallback />
                <Placeholder width="25%" height="30px" />
            </Styled.Container>
        </PageTemplateLoadingFallback>
    )
}

export default AccountCreatePageLoadingFallback

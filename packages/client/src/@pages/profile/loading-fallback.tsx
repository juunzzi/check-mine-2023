import ButtonLoadingFallback from 'src/@components/common/Button/loading-fallback'
import PageTemplateLoadingFallback from 'src/@components/common/PageTemplate/loading-fallback'

import * as Styled from './style'
const ProfileLoadingFallback = () => {
    return (
        <PageTemplateLoadingFallback>
            <Styled.Container>
                <ButtonLoadingFallback />
                <ButtonLoadingFallback />
            </Styled.Container>
        </PageTemplateLoadingFallback>
    )
}

export default ProfileLoadingFallback

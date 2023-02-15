import {Link} from 'react-router-dom'
import Icon, {MainIcon} from 'src/@components/common/Icon'
import PageTemplate from 'src/@components/common/PageTemplate'
import {PATH} from 'src/Router'

import * as Styled from './style'

const NotFoundPage = () => {
    return (
        <PageTemplate>
            <Styled.Container>
                <p>잘못된 접근이에요</p>
                <p>메인 화면으로 이동해주세요</p>
                <Link to={PATH.MAIN} css={Styled.Link}>
                    <Icon icon={MainIcon} />
                    <p>메인으로</p>
                </Link>
            </Styled.Container>
        </PageTemplate>
    )
}

export default NotFoundPage

import Icon, {MainIcon, UserIcon} from 'src/@components/common/Icon'
import {PATH} from 'src/Router'

import * as Styled from './style'

const Header = () => {
    return (
        <Styled.Container>
            <Styled.Main to={PATH.MAIN}>
                <Icon icon={MainIcon} size="32" />
            </Styled.Main>
            <Styled.User to={PATH.LOGIN}>
                <Icon icon={UserIcon} size="32" />
            </Styled.User>
        </Styled.Container>
    )
}

export default Header

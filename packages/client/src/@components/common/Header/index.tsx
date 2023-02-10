import Icon, {mainIcon, userIcon} from 'src/@components/common/Icon'
import {PATH} from 'src/Router'

import * as Styled from './style'

const Header = () => {
    return (
        <Styled.Container>
            <Styled.Main to={PATH.MAIN}>
                <Icon icon={mainIcon} size="32" />
            </Styled.Main>
            <Styled.User to={PATH.LOGIN}>
                <Icon icon={userIcon} size="32" />
            </Styled.User>
        </Styled.Container>
    )
}

export default Header

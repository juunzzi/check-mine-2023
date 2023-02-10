import Icon, {LogoIcon, UserIcon} from 'src/@components/common/Icon'
import {PATH} from 'src/Router'

import * as Styled from './style'

const Header = () => {
    return (
        <Styled.Container>
            <Styled.Main to={PATH.MAIN}>
                <Icon icon={LogoIcon} size="100" />
            </Styled.Main>
            <Styled.User to={PATH.LOGIN}>
                <Icon icon={UserIcon} size="24" />
            </Styled.User>
        </Styled.Container>
    )
}

export default Header

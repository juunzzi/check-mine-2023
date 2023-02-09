import Icon, {mainIcon, userIcon} from 'src/@components/common/Icon'
import {PATH} from 'src/Router'

import * as Style from './style'

const Header = () => {
    return (
        <Style.Container>
            <Style.Main to={PATH.MAIN}>
                <Icon icon={mainIcon} size="32" />
            </Style.Main>
            <Style.User to={PATH.LOGIN}>
                <Icon icon={userIcon} size="32" />
            </Style.User>
        </Style.Container>
    )
}

export default Header

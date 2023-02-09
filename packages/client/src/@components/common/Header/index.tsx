import Icon, {mainIcon, userIcon} from 'src/@components/common/Icon'

import * as Style from './style'

const Header = () => {
    return (
        <Style.Container>
            <Style.Main>
                <Icon icon={mainIcon} size="32" />
            </Style.Main>
            <Style.User>
                <Icon icon={userIcon} size="32" />
            </Style.User>
        </Style.Container>
    )
}

export default Header

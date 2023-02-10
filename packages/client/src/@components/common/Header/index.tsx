import Icon, {LogoIcon, UserIcon} from 'src/@components/common/Icon'
import {useFetchMe} from 'src/@domain/hooks/user'
import {PATH} from 'src/Router'

import * as Styled from './style'

const Header = () => {
    const {me} = useFetchMe()

    return (
        <Styled.Container>
            <Styled.Main to={PATH.MAIN}>
                <Icon icon={LogoIcon} size="100" />
            </Styled.Main>
            {me ? (
                <Styled.User to={PATH.PROFILE}>
                    <Styled.Profile>{me.name}</Styled.Profile>
                </Styled.User>
            ) : (
                <Styled.User to={PATH.LOGIN}>
                    <Icon icon={UserIcon} size="32" />
                </Styled.User>
            )}
        </Styled.Container>
    )
}

export default Header

import {useNavigate} from 'react-router-dom'
import Button from 'src/@components/common/Button'
import PageTemplate from 'src/@components/common/PageTemplate'
import {useFetchMe} from 'src/@domain/hooks/user'
import {PATH} from 'src/Router'

import * as Styled from './style'

const ProfilePage = () => {
    const navigate = useNavigate()

    const {logout} = useFetchMe()

    const onClickLogoutButton = () => {
        logout()

        navigate(PATH.LOGIN)
    }

    return (
        <PageTemplate>
            <Styled.Container>
                <Button onClick={onClickLogoutButton}>로그아웃</Button>
            </Styled.Container>
        </PageTemplate>
    )
}

export default ProfilePage

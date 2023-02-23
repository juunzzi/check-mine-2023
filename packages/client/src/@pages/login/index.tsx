import MainRedirectIfLoggedIn from 'src/@components/common/MainRedirectIfLoggedIn'
import PageTemplate from 'src/@components/common/PageTemplate'
import UserLoginForm from 'src/@components/user/UserLoginForm'
import {useUserLoginPage} from 'src/@pages/login/hooks'
import {PATH} from 'src/Router'

import * as Styled from './style'

const NakedLoginPage = () => {
    const {
        state: {userLoginInput, userLoginInputError},
        handler: {changeUserLoginInput, changeUserLoginInputError, submitUserLoginForm},
    } = useUserLoginPage()

    return (
        <PageTemplate>
            <Styled.Container>
                <Styled.FormLabel>로그인</Styled.FormLabel>
                <UserLoginForm
                    changeUserLoginInput={changeUserLoginInput}
                    changeUserLoginInputError={changeUserLoginInputError}
                    submitUserLoginForm={submitUserLoginForm}
                    {...userLoginInput}
                    {...userLoginInputError}
                />
                <Styled.JoinLink to={PATH.JOIN}>아직 회원이 아니신가요?</Styled.JoinLink>
            </Styled.Container>
        </PageTemplate>
    )
}

const LoginPage = () => {
    return (
        <MainRedirectIfLoggedIn>
            <NakedLoginPage />
        </MainRedirectIfLoggedIn>
    )
}

export default LoginPage

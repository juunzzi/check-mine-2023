import MainRedirectIfLoggedIn from 'src/@components/common/MainRedirectIfLoggedIn'
import PageTemplate from 'src/@components/common/PageTemplate'
import UserJoinForm from 'src/@components/user/UserJoinForm'
import {useUserJoinPage} from 'src/@pages/join/hooks'
import {PATH} from 'src/Router'

import * as Styled from './style'

const NakedJoinPage = () => {
    const {
        state: {userJoinInput, userJoinInputError},
        handler: {changeUserJoinInput, changeUserJoinInputError, submitUserJoinForm},
    } = useUserJoinPage()

    return (
        <PageTemplate>
            <Styled.Container>
                <Styled.FormLabel>회원가입</Styled.FormLabel>
                <UserJoinForm
                    changeUserJoinInput={changeUserJoinInput}
                    changeUserJoinInputError={changeUserJoinInputError}
                    submitUserJoinForm={submitUserJoinForm}
                    {...userJoinInput}
                    {...userJoinInputError}
                />
                <Styled.LoginLink to={PATH.LOGIN}>이미 회원이신가요?</Styled.LoginLink>
            </Styled.Container>
        </PageTemplate>
    )
}

const JoinPage = () => {
    return (
        <MainRedirectIfLoggedIn>
            <NakedJoinPage />
        </MainRedirectIfLoggedIn>
    )
}

export default JoinPage

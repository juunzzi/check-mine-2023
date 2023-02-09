import PageTemplate from 'src/@components/common/PageTemplate'
import UserJoinForm from 'src/@components/user/UserJoinForm'
import useUserJoinFormPage from 'src/@pages/join/hooks'
import {PATH} from 'src/Router'

import * as Styled from './style'

export type ChangeUserInputArgs = {key: 'email' | 'password' | 'name'; value: string} | {key: 'payPoint'; value: number}

const JoinPage = () => {
    const {
        state: {userInput},
        handler: {changeUserInput, submitUserJoinForm},
    } = useUserJoinFormPage()

    return (
        <PageTemplate>
            <Styled.Container>
                <Styled.FormLabel>회원가입</Styled.FormLabel>
                <UserJoinForm
                    changeUserInput={changeUserInput}
                    submitUserJoinForm={submitUserJoinForm}
                    {...userInput}
                />
                <Styled.LoginLink to={PATH.LOGIN}>이미 회원이신가요?</Styled.LoginLink>
            </Styled.Container>
        </PageTemplate>
    )
}

export default JoinPage

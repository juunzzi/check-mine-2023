import PageTemplate from 'src/@components/common/PageTemplate'
import UserJoinForm from 'src/@components/user/UserJoinForm'
import useUserJoinFormPage from 'src/@pages/join/hooks'
import {PATH} from 'src/Router'

import * as Styled from './style'

const JoinPage = () => {
    const {
        state: {userInput, userInputError},
        handler: {changeUserInput, changeUserInputError, submitUserJoinForm},
    } = useUserJoinFormPage()

    return (
        <PageTemplate>
            <Styled.Container>
                <Styled.FormLabel>회원가입</Styled.FormLabel>
                <UserJoinForm
                    changeUserInput={changeUserInput}
                    changeUserErrorInput={changeUserInputError}
                    submitUserJoinForm={submitUserJoinForm}
                    {...userInput}
                    {...userInputError}
                />
                <Styled.LoginLink to={PATH.LOGIN}>이미 회원이신가요?</Styled.LoginLink>
            </Styled.Container>
        </PageTemplate>
    )
}

export default JoinPage

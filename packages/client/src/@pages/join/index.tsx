import PageTemplate from 'src/@components/common/PageTemplate'
import UserJoinForm from 'src/@components/user/UserJoinForm'
import useUserJoinFormPage from 'src/@pages/join/hooks'

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
                <UserJoinForm
                    changeUserInput={changeUserInput}
                    submitUserJoinForm={submitUserJoinForm}
                    {...userInput}
                />
            </Styled.Container>
        </PageTemplate>
    )
}

export default JoinPage

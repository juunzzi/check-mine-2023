import {FormEventHandler} from 'react'
import {useUserJoinForm} from 'src/@components/user/UserJoinForm/hooks'
import {JoinUserRequestBody} from 'src/@domain/api/user'
import {ChangeUserInputArgs} from 'src/@pages/join'

import * as Styled from './style'

export interface UserJoinFormProps extends JoinUserRequestBody {
    changeUserInput: (args: ChangeUserInputArgs) => void
    submitUserJoinForm: FormEventHandler<HTMLFormElement>
}

const UserJoinForm = (props: UserJoinFormProps) => {
    const {name, email, password, payPoint, submitUserJoinForm} = props

    const {
        handler: {onChangeEmailInput, onChangeNameInput, onChangePasswordInput, onChangePayPointInput},
    } = useUserJoinForm(props)

    return (
        <Styled.FormConainer onSubmit={submitUserJoinForm}>
            <input value={name} onChange={onChangeNameInput} placeholder="이름을 입력해주세요" />
            <input value={email} onChange={onChangeEmailInput} placeholder="이메일을 입력해주세요" />
            <input value={password} onChange={onChangePasswordInput} placeholder="비밀번호를 입력해주세요" />
            <input value={payPoint} onChange={onChangePayPointInput} placeholder="페이 포인트를 입력해주세요" />
            <button>제출</button>
        </Styled.FormConainer>
    )
}

export default UserJoinForm

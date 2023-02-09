import {FormEventHandler} from 'react'
import Button from 'src/@components/common/Button'
import Input from 'src/@components/common/Input'
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
            <Input
                value={name}
                onChange={onChangeNameInput}
                placeholder="이름을 입력해주세요 (2~6자)"
                label="이름 (2~6자)"
            />
            <Input
                type="email"
                value={email}
                onChange={onChangeEmailInput}
                placeholder="이메일을 입력해주세요"
                label="이메일"
            />
            <Input
                type="password"
                value={password}
                onChange={onChangePasswordInput}
                placeholder="비밀번호를 입력해주세요 (최소 8자, 하나 이상의 영문자)"
                label="비밀번호 (최소 8자, 하나 이상의 영문자)"
            />
            <Input
                type="password"
                value={password}
                onChange={onChangePasswordInput}
                placeholder="비밀번호를 재입력해주세요"
                label="비밀번호 확인"
            />
            <Input
                value={payPoint}
                onChange={onChangePayPointInput}
                placeholder="페이 포인트를 입력해주세요"
                label="페이 포인트"
            />
            <Button>제출</Button>
        </Styled.FormConainer>
    )
}

export default UserJoinForm

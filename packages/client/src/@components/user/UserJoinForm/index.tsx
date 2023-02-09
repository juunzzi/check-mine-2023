import {FormEventHandler} from 'react'
import Button from 'src/@components/common/Button'
import Input from 'src/@components/common/Input'
import {useUserJoinForm} from 'src/@components/user/UserJoinForm/hooks'
import {ChangeUserInputArgs, ChangeUserInputErrorArgs, UserInputStatus} from 'src/@pages/join/hooks'

import * as Styled from './style'

export interface UserJoinFormProps extends UserInputStatus {
    changeUserInput: (args: ChangeUserInputArgs) => void
    changeUserErrorInput: (args: ChangeUserInputErrorArgs) => void
    submitUserJoinForm: FormEventHandler<HTMLFormElement>
}

const UserJoinForm = (props: UserJoinFormProps) => {
    const {
        name,
        email,
        password,
        passwordReEnter,
        payPoint,
        isNameError,
        isEmailError,
        isPasswordError,
        isPasswordReEnterError,
        isPayPointError,
        submitUserJoinForm,
    } = props

    const {
        handler: {
            onChangeEmailInput,
            onChangeNameInput,
            onChangePasswordInput,
            onChangePasswordReEnterInput,
            onChangePayPointInput,
        },
    } = useUserJoinForm(props)

    return (
        <Styled.FormConainer onSubmit={submitUserJoinForm}>
            <Input
                value={name}
                onChange={onChangeNameInput}
                placeholder="이름을 입력해주세요 (2~6자)"
                label="이름 (2~6자)"
                isError={isNameError}
                errorText="이름은 2~6 글자의 영문, 한글만 가능합니다."
            />
            <Input
                type="email"
                value={email}
                onChange={onChangeEmailInput}
                placeholder="이메일을 입력해주세요"
                label="이메일"
                isError={isEmailError}
                errorText="이메일 양식을 지켜주세요"
            />
            <Input
                type="password"
                value={password}
                onChange={onChangePasswordInput}
                placeholder="비밀번호를 입력해주세요 (최소 8자, 하나 이상의 영문자)"
                label="비밀번호 (최소 8자, 하나 이상의 영문자)"
                isError={isPasswordError}
                errorText="비밀번호는 최소 8자이고, 하나 이상의 영문자가 입력되어야 합니다."
            />
            <Input
                type="password"
                value={passwordReEnter}
                onChange={onChangePasswordReEnterInput}
                placeholder="비밀번호를 재입력해주세요"
                label="비밀번호 확인"
                isError={isPasswordReEnterError}
                errorText="비밀번호가 동일하지 않습니다."
            />
            <Input
                value={payPoint}
                onChange={onChangePayPointInput}
                placeholder="페이 포인트를 입력해주세요"
                label="페이 포인트"
                isError={isPayPointError}
                errorText="숫자만 입력이 가능합니다."
            />
            <Button>제출</Button>
        </Styled.FormConainer>
    )
}

export default UserJoinForm

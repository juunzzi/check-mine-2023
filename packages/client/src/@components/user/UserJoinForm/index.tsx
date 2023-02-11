import {FormEventHandler} from 'react'
import Button from 'src/@components/common/Button'
import {EncryptionInput, Input} from 'src/@components/common/Input'
import {useUserJoinForm} from 'src/@components/user/UserJoinForm/hooks'
import {ChangeUserJoinInputArgs, ChangeUserJoinInputErrorArgs, UserInputStatus} from 'src/@pages/join/hooks'

import * as Styled from './style'

export interface UserJoinFormProps extends UserInputStatus {
    changeUserJoinInput: (args: ChangeUserJoinInputArgs) => void
    changeUserJoinInputError: (args: ChangeUserJoinInputErrorArgs) => void
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
                id="user-join-name-input"
                value={name}
                onChange={onChangeNameInput}
                placeholder="이름을 입력해주세요 (2~6자)"
                label="이름 (2~6자)"
                isError={isNameError}
                errorText="이름은 2~6 글자의 영문, 한글만 가능합니다."
                required
            />
            <Input
                id="user-join-email-input"
                type="email"
                value={email}
                onChange={onChangeEmailInput}
                placeholder="이메일을 입력해주세요"
                label="이메일"
                isError={isEmailError}
                errorText="이메일 양식을 지켜주세요"
                required
            />
            <EncryptionInput
                id="user-join-password-input"
                value={password}
                onChange={onChangePasswordInput}
                placeholder="비밀번호를 입력해주세요 (최소 8자, 하나 이상의 영문자)"
                label="비밀번호 (최소 8자, 하나 이상의 영문자)"
                isError={isPasswordError}
                errorText="비밀번호는 최소 8자이고, 하나 이상의 영문자가 입력되어야 합니다."
                required
            />
            <EncryptionInput
                id="user-join-password-reenter-input"
                value={passwordReEnter}
                onChange={onChangePasswordReEnterInput}
                placeholder="비밀번호를 재입력해주세요"
                label="비밀번호 확인"
                isError={isPasswordReEnterError}
                errorText="비밀번호가 동일하지 않습니다."
                required
            />
            <Input
                id="user-join-pay-point-input"
                value={payPoint.toLocaleString('ko-kr')}
                onChange={onChangePayPointInput}
                placeholder="페이 포인트를 입력해주세요"
                label="페이 포인트 (최대 200만원까지)"
                isError={isPayPointError}
                errorText="200만원까지 가능합니다."
                maxLength={10}
                required
            />
            <Button>회원가입</Button>
        </Styled.FormConainer>
    )
}

export default UserJoinForm

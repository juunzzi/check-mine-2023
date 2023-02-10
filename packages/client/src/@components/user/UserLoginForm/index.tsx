import {FormEventHandler} from 'react'
import Button from 'src/@components/common/Button'
import Input from 'src/@components/common/Input'
import {useUserLoginForm} from 'src/@components/user/UserLoginForm/hooks'
import {ChangeUserLoginInputArgs, ChangeUserLoginInputErrorArgs, UserLoginInputStatus} from 'src/@pages/login/hooks'

import * as Styled from './style'

export interface UserLoginFormProps extends UserLoginInputStatus {
    changeUserLoginInput: (args: ChangeUserLoginInputArgs) => void
    changeUserLoginInputError: (args: ChangeUserLoginInputErrorArgs) => void
    submitUserLoginForm: FormEventHandler<HTMLFormElement>
}

const UserLoginForm = (props: UserLoginFormProps) => {
    const {email, password, isEmailError, isPasswordError, submitUserLoginForm} = props

    const {
        handler: {onChangeEmailInput, onChangePasswordInput},
    } = useUserLoginForm(props)

    return (
        <Styled.FormConainer onSubmit={submitUserLoginForm}>
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
            <Button>로그인</Button>
        </Styled.FormConainer>
    )
}

export default UserLoginForm

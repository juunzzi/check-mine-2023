import {isValidUserEmail, isValidUserPassword} from 'payment_common/module/validation'
import {ChangeEventHandler} from 'react'
import {UserLoginFormProps} from 'src/@components/user/UserLoginForm'

export const useUserLoginForm = (props: UserLoginFormProps) => {
    const {changeUserLoginInput, changeUserLoginInputError} = props

    const onChangeEmailInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeUserLoginInput({key: 'email', value})
        changeUserLoginInputError({key: 'isEmailError', value: !isValidUserEmail(value)})
    }

    const onChangePasswordInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeUserLoginInput({key: 'password', value})
        changeUserLoginInputError({key: 'isPasswordError', value: !isValidUserPassword(value)})
    }

    return {
        handler: {
            onChangeEmailInput,
            onChangePasswordInput,
        },
    }
}

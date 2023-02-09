import {
    isValidUserEmail,
    isValidUserName,
    isValidUserPassword,
    isValidUserPayPoint,
} from 'payment_common/module/validation'
import {ChangeEventHandler} from 'react'
import {UserJoinFormProps} from 'src/@components/user/UserJoinForm'

export const isValidUserPasswordReEnter = (password: string, passwordReEnter: string) => {
    return password === passwordReEnter
}

export const useUserJoinForm = (props: UserJoinFormProps) => {
    const {payPoint, password, changeUserInput, changeUserErrorInput} = props

    const onChangeNameInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeUserInput({key: 'name', value})
        changeUserErrorInput({key: 'isNameError', value: !isValidUserName(value)})
    }

    const onChangeEmailInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeUserInput({key: 'email', value})
        changeUserErrorInput({key: 'isEmailError', value: !isValidUserEmail(value)})
    }

    const onChangePasswordInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeUserInput({key: 'password', value})
        changeUserErrorInput({key: 'isPasswordError', value: !isValidUserPassword(value)})
    }

    const onChangePasswordReEnterInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeUserInput({key: 'passwordReEnter', value})
        changeUserErrorInput({key: 'isPasswordReEnterError', value: !isValidUserPasswordReEnter(password, value)})
    }

    const onChangePayPointInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        const numberAsValue = Number(value)
        const isValid = isValidUserPayPoint(numberAsValue)

        changeUserInput({key: 'payPoint', value: isValid ? numberAsValue : payPoint})
    }

    return {
        handler: {
            onChangeNameInput,
            onChangeEmailInput,
            onChangePasswordInput,
            onChangePasswordReEnterInput,
            onChangePayPointInput,
        },
    }
}

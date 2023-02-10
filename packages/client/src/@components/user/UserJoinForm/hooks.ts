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
    const {payPoint, password, changeUserJoinInput, changeUserJoinInputError} = props

    const onChangeNameInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeUserJoinInput({key: 'name', value})
        changeUserJoinInputError({key: 'isNameError', value: !isValidUserName(value)})
    }

    const onChangeEmailInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeUserJoinInput({key: 'email', value})
        changeUserJoinInputError({key: 'isEmailError', value: !isValidUserEmail(value)})
    }

    const onChangePasswordInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeUserJoinInput({key: 'password', value})
        changeUserJoinInputError({key: 'isPasswordError', value: !isValidUserPassword(value)})
    }

    const onChangePasswordReEnterInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeUserJoinInput({key: 'passwordReEnter', value})
        changeUserJoinInputError({key: 'isPasswordReEnterError', value: !isValidUserPasswordReEnter(password, value)})
    }

    const onChangePayPointInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        const valueReplacedRestChar = value.replace(/,/g, '')

        const numberAsValue = Number(valueReplacedRestChar)
        const isValid = isValidUserPayPoint(numberAsValue)

        changeUserJoinInput({key: 'payPoint', value: isValid ? numberAsValue : payPoint})
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

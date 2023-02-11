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
    const {password, changeUserJoinInput, changeUserJoinInputError} = props

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
        const valueAsNumber = Number(valueReplacedRestChar)

        if (isNaN(valueAsNumber)) {
            return
        }

        const isValid = isValidUserPayPoint(valueAsNumber)

        changeUserJoinInput({key: 'payPoint', value: valueAsNumber})
        changeUserJoinInputError({key: 'isPayPointError', value: !isValid})
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

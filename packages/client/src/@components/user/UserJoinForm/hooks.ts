import {ChangeEventHandler} from 'react'
import {UserJoinFormProps} from 'src/@components/user/UserJoinForm'

export const nameRegExp = /^[a-z|A-Z|가-힣|0-9]{2,6}$/

export const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

export const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

export const isValidUserName = (name: string) => {
    return nameRegExp.test(name)
}

export const isValidUserEmail = (email: string) => {
    return emailRegExp.test(email)
}

export const isValidUserPassword = (password: string) => {
    return passwordRegExp.test(password)
}

export const isValidUserPasswordReEnter = (password: string, passwordReEnter: string) => {
    return password === passwordReEnter
}

export const isValidUserPayPoint = (payPoint: number) => {
    return !isNaN(payPoint) && payPoint >= 0
}

export const useUserJoinForm = (props: UserJoinFormProps) => {
    const {password, changeUserInput, changeUserErrorInput} = props

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

        changeUserInput({key: 'payPoint', value: numberAsValue})
        changeUserErrorInput({key: 'isPayPointError', value: !isValidUserPayPoint(numberAsValue)})
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

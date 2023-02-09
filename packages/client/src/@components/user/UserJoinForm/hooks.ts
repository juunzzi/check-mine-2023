import {ChangeEventHandler} from 'react'
import {UserJoinFormProps} from 'src/@components/user/UserJoinForm'

export const useUserJoinForm = (props: UserJoinFormProps) => {
    const {changeUserInput} = props

    const onChangeNameInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeUserInput({key: 'name', value})
    }

    const onChangeEmailInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeUserInput({key: 'email', value})
    }

    const onChangePasswordInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeUserInput({key: 'password', value})
    }

    const onChangePayPointInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        const numberAsValue = Number(value)

        changeUserInput({key: 'payPoint', value: numberAsValue})
    }

    return {
        handler: {
            onChangeNameInput,
            onChangeEmailInput,
            onChangePasswordInput,
            onChangePayPointInput,
        },
    }
}

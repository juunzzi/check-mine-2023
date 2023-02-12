import {FormEventHandler, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useToast} from 'src/@components/common/Toast/hooks'
import {useMutateUserDomain} from 'src/@domain/hooks/user'
import {PATH} from 'src/Router'

interface UserJoinInputState {
    name: string
    email: string
    password: string
    passwordReEnter: string
    payPoint: number
}

interface UserJoinInputErrorState {
    isNameError: boolean
    isEmailError: boolean
    isPasswordError: boolean
    isPasswordReEnterError: boolean
    isPayPointError: boolean
}

export type ChangeUserJoinInputArgs =
    | {key: 'email' | 'password' | 'passwordReEnter' | 'name'; value: string}
    | {key: 'payPoint'; value: number}

export interface ChangeUserJoinInputErrorArgs {
    key: keyof UserJoinInputErrorState
    value: boolean
}

export type UserJoinInputStatus = UserJoinInputState & UserJoinInputErrorState

export const useUserJoinPage = () => {
    /** State를 객체로 선언하는 경우 1depth만 */
    const [userJoinInput, setUserJoinInput] = useState<UserJoinInputState>({
        name: '',
        email: '',
        password: '',
        passwordReEnter: '',
        payPoint: 0,
    })

    const [userJoinInputError, setUserJoinInputError] = useState<UserJoinInputErrorState>({
        isNameError: false,
        isEmailError: false,
        isPasswordError: false,
        isPasswordReEnterError: false,
        isPayPointError: false,
    })

    const navigate = useNavigate()

    const {showToastMessage} = useToast()

    const {joinUser} = useMutateUserDomain()

    const changeUserJoinInput = ({key, value}: ChangeUserJoinInputArgs) => {
        setUserJoinInput((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const changeUserJoinInputError = ({key, value}: ChangeUserJoinInputErrorArgs) => {
        setUserJoinInputError((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const submitUserJoinForm: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        if (Object.values(userJoinInputError).some((isError) => isError)) {
            showToastMessage('입력 양식을 확인해주세요', 'error')

            return
        }

        const {name, email, password, payPoint} = userJoinInput

        const {message} = await joinUser({name, email, password, payPoint})

        if (message === 'SUCCESS') {
            navigate(PATH.LOGIN)
        }
    }

    return {
        state: {
            userJoinInput,
            userJoinInputError,
        },
        handler: {
            changeUserJoinInput,
            changeUserJoinInputError,
            submitUserJoinForm,
        },
    }
}

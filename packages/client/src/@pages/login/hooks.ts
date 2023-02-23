import {FormEventHandler, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useToast} from 'src/@components/common/Toast/hooks'
import {useMutateUserDomain} from 'src/@domain/user/hooks'
import {PATH} from 'src/Router'

export interface UserLoginInputState {
    email: string
    password: string
}

export interface UserLoginInputErrorState {
    isEmailError: boolean
    isPasswordError: boolean
}

export interface ChangeUserLoginInputArgs {
    key: 'email' | 'password'
    value: string
}

export interface ChangeUserLoginInputErrorArgs {
    key: keyof UserLoginInputErrorState
    value: boolean
}

export type UserLoginInputStatus = UserLoginInputState & UserLoginInputErrorState

export const useUserLoginPage = () => {
    const navigate = useNavigate()

    const [userLoginInput, setUserLoginInput] = useState<UserLoginInputState>({
        email: '',
        password: '',
    })

    const [userLoginInputError, setUserLoginInputError] = useState<UserLoginInputErrorState>({
        isEmailError: false,
        isPasswordError: false,
    })

    const {loginUser} = useMutateUserDomain()

    const {showToastMessage} = useToast()

    const changeUserLoginInput = ({key, value}: ChangeUserLoginInputArgs) => {
        setUserLoginInput((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const changeUserLoginInputError = ({key, value}: ChangeUserLoginInputErrorArgs) => {
        setUserLoginInputError((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const submitUserLoginForm: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        if (Object.values(userLoginInputError).some((isError) => isError)) {
            showToastMessage('입력 양식을 확인해주세요', 'error')

            return
        }

        const {email, password} = userLoginInput

        const {message} = await loginUser({email, password})

        if (message === 'SUCCESS') {
            navigate(PATH.MAIN)
        }
    }

    return {
        state: {
            userLoginInput,
            userLoginInputError,
        },
        handler: {
            changeUserLoginInput,
            changeUserLoginInputError,
            submitUserLoginForm,
        },
    }
}

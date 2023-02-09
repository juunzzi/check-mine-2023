import {FormEventHandler, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useMutateUserDomain} from 'src/@domain/hooks/user'
import {PATH} from 'src/Router'

interface UserInputState {
    name: string
    email: string
    password: string
    passwordReEnter: string
    payPoint: number
}

interface UserInputErrorState {
    isNameError: boolean
    isEmailError: boolean
    isPasswordError: boolean
    isPasswordReEnterError: boolean
    isPayPointError: boolean
}

export type ChangeUserInputArgs =
    | {key: 'email' | 'password' | 'passwordReEnter' | 'name'; value: string}
    | {key: 'payPoint'; value: number}

export interface ChangeUserInputErrorArgs {
    key: keyof UserInputErrorState
    value: boolean
}

export type UserInputStatus = UserInputState & UserInputErrorState

const useUserJoinFormPage = () => {
    /** State를 객체로 선언하는 경우 1depth만 */
    const [userInput, setUserInput] = useState<UserInputState>({
        name: '',
        email: '',
        password: '',
        passwordReEnter: '',
        payPoint: 0,
    })

    const [userInputError, setUserInputError] = useState<UserInputErrorState>({
        isNameError: false,
        isEmailError: false,
        isPasswordError: false,
        isPasswordReEnterError: false,
        isPayPointError: false,
    })

    const navigate = useNavigate()

    const {joinUser} = useMutateUserDomain()

    const changeUserInput = ({key, value}: ChangeUserInputArgs) => {
        setUserInput((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const changeUserInputError = ({key, value}: ChangeUserInputErrorArgs) => {
        setUserInputError((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const submitUserJoinForm: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        if (Object.values(userInputError).some(({isError}) => isError)) {
            return
        }

        const {name, email, password, payPoint} = userInput

        const {message} = await joinUser({name, email, password, payPoint})

        if (message === 'SUCCESS') {
            navigate(PATH.LOGIN)
        }
    }

    return {
        state: {
            userInput,
            userInputError,
        },
        handler: {
            changeUserInput,
            changeUserInputError,
            submitUserJoinForm,
        },
    }
}

export default useUserJoinFormPage

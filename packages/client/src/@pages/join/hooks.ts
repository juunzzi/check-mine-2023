import {FormEventHandler, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {JoinUserRequestBody} from 'src/@domain/api/user'
import {useMutateUserDomain} from 'src/@domain/hooks/user'
import {ChangeUserInputArgs} from 'src/@pages/join'
import {PATH} from 'src/Router'

const useUserJoinFormPage = () => {
    const [userInput, setUserInput] = useState<JoinUserRequestBody>({
        name: '',
        email: '',
        payPoint: 0,
        password: '',
    })

    const navigate = useNavigate()

    const {joinUser} = useMutateUserDomain()

    const changeUserInput = ({key, value}: ChangeUserInputArgs) => {
        setUserInput((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const submitUserJoinForm: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const {message} = await joinUser({...userInput})

        if (message === 'SUCCESS') {
            navigate(PATH.LOGIN)
        }
    }

    return {
        state: {
            userInput,
        },
        handler: {
            changeUserInput,
            submitUserJoinForm,
        },
    }
}

export default useUserJoinFormPage

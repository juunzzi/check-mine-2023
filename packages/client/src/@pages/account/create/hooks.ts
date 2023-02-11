import {Bank} from 'payment_common/module/constant'
import {FormEventHandler, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useToast} from 'src/@components/common/Toast/hooks'
import {useMutateAccountDomain} from 'src/@domain/hooks/account'
import {PATH} from 'src/Router'

interface AccountCreateInputState {
    bankName: Bank
    number: string
    amount: number
}

interface AccountCreateInputErrorState {
    isBankNameError: boolean
    isNumberError: boolean
    isAmountError: boolean
}

export type ChangeAccountCreateInputArgs =
    | {key: 'bankName'; value: Bank}
    | {key: 'number'; value: string}
    | {key: 'amount'; value: number}

export interface ChangeAccountCreateInputErrorArgs {
    key: keyof AccountCreateInputErrorState
    value: boolean
}

export type AccountCreateInputStatus = AccountCreateInputState & AccountCreateInputErrorState

export const useAccountCreatePage = () => {
    const [accountCreateInput, setAccountCreateInput] = useState<AccountCreateInputState>({
        bankName: '국민은행',
        number: '',
        amount: 0,
    })

    const [accountCreateInputError, setAccountCreateInputError] = useState<AccountCreateInputErrorState>({
        isBankNameError: false,
        isNumberError: false,
        isAmountError: false,
    })

    const navigate = useNavigate()

    const {showToastMessage} = useToast()

    const {createAccount} = useMutateAccountDomain()

    const changeAccountCreateInput = ({key, value}: ChangeAccountCreateInputArgs) => {
        setAccountCreateInput((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const changeAccountCreateInputError = ({key, value}: ChangeAccountCreateInputErrorArgs) => {
        setAccountCreateInputError((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    const submitAccountCreateForm: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        if (Object.values(accountCreateInputError).some((isError) => isError)) {
            showToastMessage('입력 양식을 확인해주세요', 'error')

            return
        }

        const {bankName, number, amount} = accountCreateInput

        const {message} = await createAccount({bankName, number, amount})

        if (message === 'SUCCESS') {
            navigate(PATH.MAIN)
        }
    }

    return {
        state: {
            accountCreateInput,
            accountCreateInputError,
        },
        handler: {
            changeAccountCreateInput,
            changeAccountCreateInputError,
            submitAccountCreateForm,
        },
    }
}

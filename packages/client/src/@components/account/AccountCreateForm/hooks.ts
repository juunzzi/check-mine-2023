import {isValidAccountAmount, isValidAccountNumber, isValidBankName} from 'payment_common/module/validation'
import {ChangeEventHandler} from 'react'
import {AccountCreateFormProps} from 'src/@components/account/AccountCreateForm'

export const useAccountCreateForm = (props: AccountCreateFormProps) => {
    const {amount, changeAccountCreateInput, changeAccountCreateInputError} = props

    const onChangeBankName: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const {
            target: {value},
        } = e

        if (!isValidBankName(value)) {
            return
        }

        changeAccountCreateInput({key: 'bankName', value})
    }

    const onChangeAccountNumber: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        changeAccountCreateInput({key: 'number', value})
        changeAccountCreateInputError({key: 'isNumberError', value: !isValidAccountNumber(value)})
    }

    const onChangeAmount: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {
            target: {value},
        } = e

        const valueReplacedRestChar = value.replace(/,/g, '')

        const numberAsValue = Number(valueReplacedRestChar)
        const isValid = isValidAccountAmount(numberAsValue)

        changeAccountCreateInput({key: 'amount', value: isValid ? numberAsValue : amount})
        changeAccountCreateInputError({key: 'isAmountError', value: !isValid})
    }

    return {
        handler: {
            onChangeBankName,
            onChangeAccountNumber,
            onChangeAmount,
        },
    }
}

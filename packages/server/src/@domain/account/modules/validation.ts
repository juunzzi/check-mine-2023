import {isValidAccountAmount, isValidAccountNumber, isValidBankName} from 'payment_common/module/validation'
import {CreateAccountInput} from 'src/@domain/account/service'

export const isValidCreateAccountInput = (createAccountInput: CreateAccountInput) => {
    const {amount, bankName, number} = createAccountInput

    return isValidBankName(bankName) && isValidAccountNumber(number) && isValidAccountAmount(amount)
}

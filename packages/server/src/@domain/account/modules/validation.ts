import {CreateAccountInput} from 'src/@domain/account/service'
import {Bank, BANK} from 'src/@domain/account/type'

export const accountNumberRegExp = /^(\d{1,})(-(\d{1,})){1,}/

export const isValidBankName = (bankName: Bank) => {
    return BANK.includes(bankName)
}

export const isValidAccountNumber = (accountNumber: string) => {
    return accountNumberRegExp.test(accountNumber)
}

export const isValidAccountAmount = (accountAmount: number) => {
    return accountAmount > 0
}

export const isValidCreateAccountInput = (createAccountInput: CreateAccountInput) => {
    const {amount, bankName, number} = createAccountInput

    return isValidBankName(bankName) && isValidAccountNumber(number) && isValidAccountAmount(amount)
}

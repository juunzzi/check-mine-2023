import {
    isValidUserName,
    isValidUserEmail,
    isValidUserPassword,
    isValidUserPayPoint,
} from 'payment_common/module/validation'
import {CreateUserInput, EditUserInput} from 'src/@domain/user/service'

export const isValidCreateUserInput = (userInput: CreateUserInput) => {
    const {name, email, password, payPoint} = userInput

    return (
        isValidUserName(name) &&
        isValidUserEmail(email) &&
        isValidUserPassword(password) &&
        isValidUserPayPoint(payPoint)
    )
}

export const isValidEditUserInput = (editUserInput: EditUserInput) => {
    const {name, email, payPoint} = editUserInput

    return isValidUserName(name) && isValidUserEmail(email) && isValidUserPayPoint(payPoint)
}

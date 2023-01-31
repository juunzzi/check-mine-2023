import {User} from 'src/@domain/user/type'

/** 영문자, 한글, 숫자만을 포함하여 2~6 글자만 이름으로 가능하다 */
export const nameRegExp = /^[a-z|A-Z|가-힣|0-9]{2,6}$/

export const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

/** 최소 8 자, 하나 이상의 영문자와 숫자 */
export const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

export const isValidUserName = (name: string) => {
    return nameRegExp.test(name)
}

export const isValidUserEmail = (email: string) => {
    return emailRegExp.test(email)
}

export const isValidUserPassword = (password: string) => {
    return passwordRegExp.test(password)
}

export const isValidUserPayPoint = (payPoint: number) => {
    return !isNaN(payPoint) && payPoint >= 0
}

export const isValidUserInput = (userInput: User) => {
    const {name, email, password, payPoint} = userInput

    return (
        isValidUserName(name) &&
        isValidUserEmail(email) &&
        isValidUserPassword(password) &&
        isValidUserPayPoint(payPoint)
    )
}

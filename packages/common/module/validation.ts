export const nameRegExp = /^[a-z|A-Z|가-힣]{2,6}$/

export const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

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
    return !isNaN(payPoint) && payPoint >= 0 && payPoint < 2000000
}

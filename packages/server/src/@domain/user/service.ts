import bcrypt from 'bcrypt'
import {generateAccessToken} from 'src/@domain/user/modules/jwt'
import {findUserByEmailQuery, findUserById, insertUserQuery} from 'src/@domain/user/modules/query'
import {isValidUserInput} from 'src/@domain/user/modules/validation'
import {User} from 'src/@domain/user/type'

export const getMe = async (id: number) => {
    const user = await findUserById(id)

    if (!user) {
        throw new Error('인증 정보가 존재하지 않습니다.')
    }

    /** Account 개발 시 account 객체도 함께 넘겨줄 것 */

    return user
}

export const createUser = async (userInput: User) => {
    const {email, password} = userInput

    const user = await findUserByEmailQuery(email)

    const hashedPassword = await bcrypt.hash(password, 10)

    if (!isValidUserInput(userInput)) {
        throw new Error('입력 값을 확인해주세요.')
    }

    if (user) {
        throw new Error('중복된 이메일입니다.')
    }

    return insertUserQuery({...userInput, password: hashedPassword})
}

export const loginUser = async (email: string, password: string) => {
    const user = await findUserByEmailQuery(email)

    const isMatch = await bcrypt.compare(password, user.password)

    if (!user || !isMatch) {
        throw new Error('아이디 혹은 비밀번호가 일치하지 않습니다.')
    }

    return generateAccessToken(user.id)
}

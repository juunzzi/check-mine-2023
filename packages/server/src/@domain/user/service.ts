import bcrypt from 'bcrypt'
import {generateAccessToken} from 'src/@domain/user/modules/jwt'
import {findUserByEmailQuery, insertUserQuery} from 'src/@domain/user/modules/query'
import {isValidUserInput} from 'src/@domain/user/modules/validation'
import {User} from 'src/@domain/user/type'

export const createUser = async (userInput: User) => {
    const {email, password} = userInput

    const user = await findUserByEmailQuery(email)

    const hashedPassword = bcrypt.hashSync(password, 10)

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

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error('아이디 혹은 비밀번호가 일치하지 않습니다.')
    }

    return generateAccessToken(user.id)
}

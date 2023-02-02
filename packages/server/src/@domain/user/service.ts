import bcrypt from 'bcrypt'
import {generateAccessToken} from 'src/@domain/user/modules/jwt'
import * as DB from 'src/@domain/user/modules/query'
import {isValidEditUserInput, isValidCreateUserInput} from 'src/@domain/user/modules/validation'
import {User} from 'src/@domain/user/type'

export const getUser = async (id: number) => {
    const user = await DB.findUserById(id)

    if (!user) {
        throw new Error('인증 정보가 존재하지 않습니다.')
    }

    return user
}

export type EditUserInput = Omit<User, 'password'>

export const editUser = async (newUser: EditUserInput) => {
    if (!isValidEditUserInput(newUser)) {
        throw new Error('입력 값을 확인해주세요.')
    }

    return DB.updateUser(newUser)
}

export type CreateUserInput = Omit<User, 'id'>

export const createUser = async (userInput: CreateUserInput) => {
    const {email, password} = userInput

    if (!isValidCreateUserInput(userInput)) {
        throw new Error('입력 값을 확인해주세요.')
    }

    const user = await DB.findUserByEmail(email)

    const hashedPassword = await bcrypt.hash(password, 10)

    if (user) {
        throw new Error('중복된 이메일입니다.')
    }

    return DB.insertUser({...userInput, password: hashedPassword})
}

export const loginUser = async (email: string, password: string) => {
    const user = await DB.findUserByEmail(email)

    const isMatch = await bcrypt.compare(password, user.password)

    if (!user || !isMatch) {
        throw new Error('아이디 혹은 비밀번호가 일치하지 않습니다.')
    }

    return generateAccessToken(user.id)
}

import bcrypt from 'bcrypt'
import {generateAccessToken} from 'src/@domain/user/modules/jwt'
import * as DB from 'src/@domain/user/modules/query'
import {isValidEditUserInput, isValidCreateUserInput} from 'src/@domain/user/modules/validation'
import {User} from 'src/@domain/user/type'

export const getUser = (id: number) => {
    return DB.findUserById(id)
}

export type EditUserInput = Omit<User, 'password'>

export const editUser = async (newUser: EditUserInput) => {
    if (!isValidEditUserInput(newUser)) {
        return null
    }

    return DB.updateUser(newUser)
}

export type CreateUserInput = Omit<User, 'id'>

export const createUser = async (userInput: CreateUserInput) => {
    const {email, password} = userInput

    if (!isValidCreateUserInput(userInput)) {
        return null
    }

    const user = await DB.findUserByEmail(email)

    if (user) {
        return null
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    return DB.insertUser({...userInput, password: hashedPassword})
}

export const loginUser = async (email: string, password: string) => {
    const user = await DB.findUserByEmail(email)

    const isMatch = await bcrypt.compare(password, user.password)

    if (!user || !isMatch) {
        return null
    }

    return generateAccessToken(user.id)
}

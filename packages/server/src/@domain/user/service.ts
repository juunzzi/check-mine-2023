import bcrypt from 'bcrypt'
import {generateAccessToken} from 'src/@domain/user/modules/jwt'
import * as DB from 'src/@domain/user/modules/query'
import {isValidEditUserInput, isValidCreateUserInput} from 'src/@domain/user/modules/validation'
import {User} from 'src/@domain/user/type'

export const getUser = async (id: number) => {
    const user = await DB.findUserById(id)

    return {data: user, message: user ? 'SUCCESS' : 'FAILED'}
}

export type EditUserInput = Omit<User, 'password'>

export const editUser = async (newUser: EditUserInput) => {
    if (!isValidEditUserInput(newUser)) {
        return {data: null, message: 'EDIT_USER_INPUT_ERROR'}
    }

    const updateResult = await DB.updateUser(newUser)

    return {data: updateResult, message: updateResult ? 'SUCCESS' : 'FAILED'}
}

export type CreateUserInput = Omit<User, 'id'>

export const createUser = async (userInput: CreateUserInput) => {
    if (!isValidCreateUserInput(userInput)) {
        return {data: null, message: 'CREATE_USER_INPUT_ERROR'}
    }

    const {email, password} = userInput

    const user = await DB.findUserByEmail(email)

    if (user) {
        return {data: null, message: 'DUPLICATE_EMAIL'}
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const insertResult = await DB.insertUser({...userInput, password: hashedPassword})

    return {data: insertResult, message: insertResult ? 'SUCCESS' : 'FAILED'}
}

export const loginUser = async (email: string, password: string) => {
    const user = await DB.findUserByEmail(email)

    if (!user) {
        return {data: null, message: 'FAILED_LOGIN'}
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return {data: null, message: 'FAILED_LOGIN'}
    }

    const accessToken = generateAccessToken(user.id)

    return {data: accessToken, message: accessToken ? 'SUCCESS' : 'FAILED'}
}

import bcrypt from 'bcrypt'
import {generateAccessToken} from 'src/@domain/user/modules/jwt'
import * as DB from 'src/@domain/user/modules/query'
import {isValidEditUserInput, isValidCreateUserInput} from 'src/@domain/user/modules/validation'
import {User} from 'src/@domain/user/type'
import {RES_MSG, RES_MSG_TYPE} from 'src/common/response-message'

export const getUser = async (id: number) => {
    const user = await DB.findUserById(id)
    const message = user ? RES_MSG.SUCCESS : RES_MSG.FAILURE

    return {data: user, message}
}

export type EditUserInput = Omit<User, 'password'>

export const editUser = async (newUser: EditUserInput): Promise<{data: any; message: RES_MSG_TYPE}> => {
    if (!isValidEditUserInput(newUser)) {
        return {data: null, message: RES_MSG.EDIT_USER_INPUT_ERROR}
    }

    const updateResult = await DB.updateUser(newUser)
    const message = updateResult ? RES_MSG.SUCCESS : RES_MSG.FAILURE

    return {data: updateResult, message}
}

export type CreateUserInput = Omit<User, 'id'>

export const createUser = async (userInput: CreateUserInput): Promise<{data: any; message: RES_MSG_TYPE}> => {
    if (!isValidCreateUserInput(userInput)) {
        return {data: null, message: RES_MSG.CREATE_USER_INPUT_ERROR}
    }

    const {email, password} = userInput

    const user = await DB.findUserByEmail(email)

    if (user) {
        return {data: null, message: RES_MSG.DUPLICATE_EMAIL}
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const insertResult = await DB.insertUser({...userInput, password: hashedPassword})
    const message = insertResult ? RES_MSG.SUCCESS : RES_MSG.FAILURE

    return {data: insertResult, message}
}

export const loginUser = async (email: string, password: string): Promise<{data: any; message: RES_MSG_TYPE}> => {
    const user = await DB.findUserByEmail(email)

    if (!user) {
        return {data: null, message: RES_MSG.FAILURE}
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return {data: null, message: RES_MSG.FAILURE}
    }

    const accessToken = generateAccessToken(user.id)
    const message = accessToken ? RES_MSG.SUCCESS : RES_MSG.FAILURE

    return {data: accessToken, message}
}

import bcrypt from 'bcrypt'
import {PAYMENT_TOKEN_EXPIRATION, RES_MSG} from 'payment_common/module/constant'
import {generateUserJWT} from 'src/@domain/user/modules/jwt'
import * as DB from 'src/@domain/user/modules/query'
import {isValidEditUserInput, isValidCreateUserInput} from 'src/@domain/user/modules/validation'
import {User} from 'src/@domain/user/type'

export type EditUserInput = Omit<User, 'password'>

export type CreateUserInput = Omit<User, 'id'>

const USER_SERVICE = {
    get: async (id: number) => {
        const user = await DB.findUserById(id)
        const message = user ? RES_MSG.GET_USER_SUCCESS : RES_MSG.GET_USER_FAILURE

        return {data: user, message}
    },
    edit: async (newUser: EditUserInput) => {
        if (!isValidEditUserInput(newUser)) {
            return {message: RES_MSG.EDIT_USER_INPUT_ERROR}
        }

        const updateResult = await DB.updateUser(newUser)
        const message = updateResult ? RES_MSG.EDIT_USER_SUCCESS : RES_MSG.EDIT_USER_FAILURE

        return {data: updateResult, message}
    },
    join: async (userInput: CreateUserInput) => {
        if (!isValidCreateUserInput(userInput)) {
            return {message: RES_MSG.JOIN_USER_INPUT_ERROR}
        }

        const {email, password} = userInput

        const user = await DB.findUserByEmail(email)

        if (user) {
            return {message: RES_MSG.JOIN_USER_DUPLICATE_EMAIL}
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const insertResult = await DB.insertUser({...userInput, password: hashedPassword})
        const message = insertResult ? RES_MSG.JOIN_USER_SUCCESS : RES_MSG.JOIN_USER_FAILURE

        return {data: insertResult, message}
    },
    login: async (email: string, password: string) => {
        const user = await DB.findUserByEmail(email)

        if (!user) {
            return {message: RES_MSG.IS_NOT_MATCH_EMAIL_OR_PASSWORD}
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return {message: RES_MSG.IS_NOT_MATCH_EMAIL_OR_PASSWORD}
        }

        const accessToken = generateUserJWT(user.id, 60 * 60 * 1000)
        const message = accessToken ? RES_MSG.LOGIN_USER_SUCCESS : RES_MSG.LOGIN_USER_FAILURE

        return {data: accessToken, message}
    },
    generatePaymentToken: (id: number) => {
        const paymentToken = generateUserJWT(id, PAYMENT_TOKEN_EXPIRATION)
        const message = paymentToken ? RES_MSG.GENERATE_PAYMENT_TOKEN_SUCCESS : RES_MSG.GENERATE_PAYMENT_TOKEN_FAILURE

        return {data: paymentToken, message}
    },
}

export default USER_SERVICE

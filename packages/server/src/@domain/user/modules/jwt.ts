import jwt from 'jsonwebtoken'
import type {VerifyCallback, JwtPayload} from 'jsonwebtoken'

const {JWT_PRIVATE_KEY} = process.env
const EXPIRED_TIME = 60 * 60 * 1000

export const generateAccessToken = (id: number) => {
    const accessToken = jwt.sign({id}, JWT_PRIVATE_KEY, {expiresIn: EXPIRED_TIME, algorithm: 'HS256'})

    return accessToken
}

export const decodeAccessToken = (accessToken: string, callback?: VerifyCallback<JwtPayload | string>) => {
    return jwt.verify(accessToken, JWT_PRIVATE_KEY, callback)
}

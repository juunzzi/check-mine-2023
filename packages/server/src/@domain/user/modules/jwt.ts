import jwt from 'jsonwebtoken'

const {JWT_PRIVATE_KEY} = process.env
const EXPIRED_TIME = 60 * 60 * 1000

export const generateAccessToken = (id: number) => {
    const accessToken = jwt.sign({id}, JWT_PRIVATE_KEY, {expiresIn: EXPIRED_TIME, algorithm: 'HS256'})

    return accessToken
}

export const decodeAccessToken = ({token, errorResolve}: {token: string; errorResolve: boolean}) => {
    return new Promise((resolve, reject) => {
        const errorResolveCallback: jwt.VerifyCallback<string | jwt.JwtPayload> = (error, decoded) => {
            if (error) {
                resolve(error)

                return
            }

            reject(decoded)
        }

        const decodedResolveCallback: jwt.VerifyCallback<string | jwt.JwtPayload> = (error, decoded) => {
            if (decoded) {
                resolve(decoded)

                return
            }

            reject(error)
        }

        return jwt.verify(token, JWT_PRIVATE_KEY, errorResolve ? errorResolveCallback : decodedResolveCallback)
    })
}

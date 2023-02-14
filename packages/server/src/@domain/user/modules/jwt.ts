import jwt from 'jsonwebtoken'

const {JWT_PRIVATE_KEY} = process.env

export const generateUserJWT = (id: number, EXPIRED_TIME: number) => {
    const accessToken = jwt.sign({id}, JWT_PRIVATE_KEY, {expiresIn: EXPIRED_TIME, algorithm: 'HS256'})

    return accessToken
}

export const decodeUserJWT = ({token, errorResolve}: {token: string; errorResolve: boolean}) => {
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

        jwt.verify(token, JWT_PRIVATE_KEY, errorResolve ? errorResolveCallback : decodedResolveCallback)
    })
}

import {User} from 'src/@domain/user/type'
import pool from 'src/db'

export interface UserTableRow {
    id: number
    name: string
    email: string
    password: string
    ['pay_point']: number
    ['account_id']: null
}

export const isUserTableRowType = (userQueryResponse: any): userQueryResponse is UserTableRow => {
    return (
        userQueryResponse &&
        userQueryResponse['account_id'] === null &&
        typeof userQueryResponse.name === 'string' &&
        typeof userQueryResponse.email === 'string' &&
        typeof userQueryResponse.password === 'string' &&
        typeof userQueryResponse['pay_point'] === 'number'
    )
}

export const insertUserQuery = (userInput: User) => {
    const {name, email, password, payPoint, accountId} = userInput

    return pool.query(
        `INSERT INTO payment.user (name, email, password, pay_point, account_id)
         VALUES (?,?,?,?,?)`,
        [name, email, password, payPoint, accountId],
    )
}

export const findUserByEmailQuery = async (email: string) => {
    const user = await pool.query(`SELECT * FROM USER WHERE email='${email}'`)

    if (!user[0] || !isUserTableRowType(user[0])) {
        return
    }

    return {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        password: user[0].password,
        payPoint: user[0].pay_point,
        accountId: user[0].account_id,
    }
}

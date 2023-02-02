import {CreateUserInput, EditUserInput} from 'src/@domain/user/service'
import pool from 'src/db'

export interface UserTableRow {
    id: number
    name: string
    email: string
    password: string
    ['pay_point']: number
    ['account_id']: null
}

export const isUserTableRowType = (userQueryResult: any): userQueryResult is UserTableRow => {
    return (
        userQueryResult &&
        userQueryResult['account_id'] === null &&
        typeof userQueryResult.name === 'string' &&
        typeof userQueryResult.email === 'string' &&
        typeof userQueryResult.password === 'string' &&
        typeof userQueryResult['pay_point'] === 'number'
    )
}

export const insertUser = (userInput: CreateUserInput) => {
    const {name, email, password, payPoint, accountId} = userInput

    return pool.query(
        `INSERT INTO payment.user (name, email, password, pay_point, account_id)
         VALUES (?,?,?,?,?)`,
        [name, email, password, payPoint, accountId],
    )
}

export const findUserByEmail = async (email: string) => {
    const userQueryResult = await pool.query(`SELECT * FROM USER WHERE email='${email}'`)

    if (!userQueryResult[0] || !isUserTableRowType(userQueryResult[0])) {
        return
    }

    return {
        id: userQueryResult[0].id,
        name: userQueryResult[0].name,
        email: userQueryResult[0].email,
        password: userQueryResult[0].password,
        payPoint: userQueryResult[0].pay_point,
        accountId: userQueryResult[0].account_id,
    }
}

export const findUserById = async (id: number) => {
    const userQueryResult = await pool.query(`SELECT * FROM USER WHERE id='${id}'`)

    if (!userQueryResult[0] || !isUserTableRowType(userQueryResult[0])) {
        return
    }

    return {
        id: userQueryResult[0].id,
        name: userQueryResult[0].name,
        email: userQueryResult[0].email,
        password: userQueryResult[0].password,
        payPoint: userQueryResult[0].pay_point,
        accountId: userQueryResult[0].account_id,
    }
}

export const updateUser = async (newUser: EditUserInput) => {
    const {id, name, email, payPoint, accountId} = newUser

    await pool.query(
        `UPDATE USER 
         SET name=?, email=?, pay_point=?, account_id=? WHERE id=?`,
        [name, email, payPoint, accountId, id],
    )
}

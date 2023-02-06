import {CreateUserInput, EditUserInput} from 'src/@domain/user/service'
import {isNullType, isNumberType, isStringType} from 'src/common/type/guard'
import pool from 'src/db'

export interface UserTableRow {
    id: number
    name: string
    email: string
    password: string
    pay_point: number
    account_id: number | null
}

export const isUserTableRowType = (userTableRow: any): userTableRow is UserTableRow => {
    return (
        userTableRow &&
        isNumberType(userTableRow.pay_point) &&
        isStringType(userTableRow.name) &&
        isStringType(userTableRow.email) &&
        isStringType(userTableRow.password) &&
        (isNumberType(userTableRow.account_id) || isNullType(userTableRow.account_id))
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
    const [userTableRow] = await pool.query(`SELECT * FROM USER WHERE email=?`, [email])

    if (!isUserTableRowType(userTableRow)) {
        return
    }

    return {
        id: userTableRow.id,
        name: userTableRow.name,
        email: userTableRow.email,
        password: userTableRow.password,
        payPoint: userTableRow.pay_point,
        accountId: userTableRow.account_id,
    }
}

export const findUserById = async (id: number) => {
    const [userTableRow] = await pool.query(`SELECT * FROM USER WHERE id=?`, [id])

    if (!isUserTableRowType(userTableRow)) {
        return
    }

    return {
        id: userTableRow.id,
        name: userTableRow.name,
        email: userTableRow.email,
        password: userTableRow.password,
        payPoint: userTableRow.pay_point,
        accountId: userTableRow.account_id,
    }
}

export const updateUser = async (newUser: EditUserInput) => {
    const {id, name, email, payPoint, accountId} = newUser

    return pool.query(
        `UPDATE USER 
         SET name=?, email=?, pay_point=?, account_id=? WHERE id=?`,
        [name, email, payPoint, accountId, id],
    )
}

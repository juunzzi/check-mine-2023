import {Connection} from 'mariadb'
import {Bank} from 'payment_common/module/constant'
import {isValidBankName} from 'payment_common/module/validation'
import {CreateAccountInput} from 'src/@domain/account/service'
import {Account} from 'src/@domain/account/type'
import {isInsertQueryResultType} from 'src/common/db/type'
import {transactQueries} from 'src/common/db/util'
import {isNumberType, isStringType} from 'src/common/type/guard'
import pool from 'src/db'

export interface AccountTableRow {
    id: number
    bank_name: Bank
    number: string
    amount: number
    user_id: number
}

export const isAccountTableRow = (accountTableRow: any): accountTableRow is AccountTableRow => {
    return (
        accountTableRow &&
        isNumberType(accountTableRow.id) &&
        isNumberType(accountTableRow.amount) &&
        isNumberType(accountTableRow.user_id) &&
        isStringType(accountTableRow.number) &&
        isValidBankName(accountTableRow.bank_name)
    )
}

export const findAccountByUserId = async (id: number) => {
    const [accountTableRow] = await pool.query(`SELECT * FROM ACCOUNT WHERE user_id=?`, [id])

    if (!isAccountTableRow(accountTableRow)) {
        return
    }

    return {
        id: accountTableRow.id,
        bankName: accountTableRow.bank_name,
        amount: accountTableRow.amount,
        number: accountTableRow.number,
        userId: accountTableRow.user_id,
    }
}

export const findAccountByAccountId = async (id: number) => {
    const [accountTableRow] = await pool.query(`SELECT * FROM ACCOUNT WHERE id=?`, [id])

    if (!isAccountTableRow(accountTableRow)) {
        return
    }

    return {
        id: accountTableRow.id,
        bankName: accountTableRow.bank_name,
        amount: accountTableRow.amount,
        number: accountTableRow.number,
        userId: accountTableRow.user_id,
    }
}

export const insertAccount = async (accountInput: CreateAccountInput) => {
    const {bankName, number, amount, userId} = accountInput

    const result = await transactQueries(async (connection: Connection) => {
        const accountQueryResult = await connection.query(
            `INSERT INTO ACCOUNT (bank_name, number, amount, user_id)
             VALUES (?,?,?,?)`,
            [bankName, number, amount, userId],
        )

        if (!isInsertQueryResultType(accountQueryResult)) {
            return
        }

        const insertId = Number(accountQueryResult.insertId.toString())

        const updateQueryResult = await connection.query(
            `UPDATE USER
             SET account_id=? WHERE id=?`,
            [insertId, userId],
        )

        return updateQueryResult
    })

    return result
}

export const updateAccount = async (newAccount: Account) => {
    const {id, amount, bankName, number, userId} = newAccount

    return pool.query(
        `UPDATE ACCOUNT 
             SET amount=?, bank_name=?, number=?, user_id=? WHERE id=?`,
        [amount, bankName, number, userId, id],
    )
}

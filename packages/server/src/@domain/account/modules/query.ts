import {isValidBankName} from 'src/@domain/account/modules/validation'
import {CreateAccountInput} from 'src/@domain/account/service'
import {Bank} from 'src/@domain/account/type'
import {isInsertQueryResult} from 'src/common/types/query'
import pool from 'src/db'

export interface AccountTableRow {
    id: number
    bank_name: Bank
    number: string
    amount: number
    user_id: number
}

export const isAccountTableRow = (accountQueryResult: any): accountQueryResult is AccountTableRow => {
    return (
        accountQueryResult &&
        typeof accountQueryResult.id === 'number' &&
        typeof accountQueryResult.number === 'string' &&
        typeof accountQueryResult.amount === 'number' &&
        typeof accountQueryResult.user_id === 'number' &&
        isValidBankName(accountQueryResult.bank_name)
    )
}

export const findAccountByUserId = async (id: number) => {
    const accountQueryResult = await pool.query(`SELECT * FROM ACCOUNT WHERE user_id=?`, [id])

    if (!accountQueryResult[0] || !isAccountTableRow(accountQueryResult[0])) {
        return
    }

    return {
        id: accountQueryResult[0].id,
        bankName: accountQueryResult[0].bank_name,
        amount: accountQueryResult[0].amount,
        number: accountQueryResult[0].number,
        userId: accountQueryResult[0].user_id,
    }
}

export const insertAccount = async (accountInput: CreateAccountInput) => {
    const {bankName, number, amount, userId} = accountInput

    const accountQueryResult = await pool.query(
        `INSERT INTO ACCOUNT (bank_name, number, amount, user_id)
         VALUES (?,?,?,?)`,
        [bankName, number, amount, userId],
    )

    if (!isInsertQueryResult(accountQueryResult)) {
        return
    }

    const insertId = Number(accountQueryResult.insertId.toString())

    await pool.query(
        `UPDATE USER
         SET account_id=? WHERE id=?`,
        [insertId, userId],
    )
}

import {isValidBankName} from 'src/@domain/account/modules/validation'
import {CreateAccountInput} from 'src/@domain/account/service'
import {Account, Bank} from 'src/@domain/account/type'
import {isInsertQueryResult} from 'src/common/db/type'
import {transactQueries} from 'src/common/db/util'
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
        typeof accountTableRow.id === 'number' &&
        typeof accountTableRow.number === 'string' &&
        typeof accountTableRow.amount === 'number' &&
        typeof accountTableRow.user_id === 'number' &&
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

    const connection = await pool.getConnection()

    const result = await transactQueries(async () => {
        const accountQueryResult = await connection.query(
            `INSERT INTO ACCOUNT (bank_name, number, amount, user_id)
             VALUES (?,?,?,?)`,
            [bankName, number, amount, userId],
        )

        if (!isInsertQueryResult(accountQueryResult)) {
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

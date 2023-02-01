import {BANK, Bank} from 'src/@domain/account/type'
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
        BANK.includes(accountQueryResult.bank_name)
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

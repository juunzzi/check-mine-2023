import {PoolConnection} from 'mariadb'
import pool from 'src/db'

export const transactQueries = async <T>(executor: (connection: PoolConnection) => Promise<T>) => {
    const connection = await pool.getConnection()

    try {
        await connection.beginTransaction()

        const result = await executor(connection)

        await connection.commit()

        return result
    } catch (error) {
        await connection.rollback()

        throw error
    } finally {
        await connection.release()
    }
}

export const generateQueryStatement = (iterationCount: number) => {
    const {inStatement, whenStatement} = Array.from({length: iterationCount}).reduce<{
        inStatement: string
        whenStatement: string
    }>(
        (prev, _, index) => {
            const nextInStatement = index === 0 ? `${prev.inStatement}?` : `${prev.inStatement},?`
            const nextWhenStatement = `${prev.whenStatement}WHEN ? THEN ? `

            return {
                inStatement: nextInStatement,
                whenStatement: nextWhenStatement,
            }
        },
        {
            inStatement: '',
            whenStatement: '',
        },
    )

    return {
        inStatement: `IN (${inStatement})`,
        whenStatement,
    }
}

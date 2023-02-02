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
    }
}

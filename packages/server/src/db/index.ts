import {createPool} from 'mariadb'

const pool = createPool({
    host: process.env.host,
    port: Number(process.env.DB_PORT) ?? 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

export default pool

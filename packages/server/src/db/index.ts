import {createPool} from 'mariadb'

const pool = createPool({
    host: process.env.host,
    port: Number(process.env.DB_PORT) ?? 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

export default pool

// async function asyncFunction() {
//     let conn
//     try {
//         conn = await pool.getConnection()
//         const rows = await conn.query('SELECT 1 as val')
//         // rows: [ {val: 1}, meta: ... ]

//         const res = await conn.query('INSERT INTO myTable value (?, ?)', [1, 'mariadb'])
//         // res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
//     } finally {
//         if (conn) {
//             conn.release()
//         } // release to pool
//     }
// }

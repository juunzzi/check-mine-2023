import {createPool} from 'mariadb'
import Logger from 'src/common/logger/winston'

const pool = createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) ?? 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

export const initializeDB = async () => {
    try {
        const connection = await pool.getConnection()

        await connection.query(`create table IF NOT EXISTS user
        (
            id         int auto_increment primary key,
            name       varchar(255)  not null,
            email      varchar(255)  not null,
            password   varchar(255)  not null,
            pay_point  int default 0 null,
            account_id int           null
        )`)

        await connection.query(`create table IF NOT EXISTS product
        (
            id    int auto_increment
                primary key,
            name  varchar(255)  not null,
            price int           not null,
            stock int default 0 not null
        )`)

        await connection.query(`create table IF NOT EXISTS account
        (
            id        int auto_increment
                primary key,
            bank_name varchar(255)  not null,
            number    varchar(255)  not null,
            amount    int default 0 not null,
            user_id   int           not null,
            constraint account_user_id
                foreign key (user_id) references user (id)
                    on update cascade on delete cascade
        )`)

        Logger.info('데이터베이스 셋업을 성공하였습니다.')
    } catch (error) {
        Logger.error(error)
    }
}

export default pool

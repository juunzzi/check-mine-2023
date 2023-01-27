import './env'

import Koa from 'koa'
import koaLogger from 'koa-logger'
import pool from 'src/db'

const app = new Koa()

app.use(koaLogger())

app.use(async (ctx) => {
    ctx.body = 'Plain Text'

    console.log(pool)

    pool.query('select * from product').then((data) => console.log(data))
})

app.listen(8080)

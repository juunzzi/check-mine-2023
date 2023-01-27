import './env'

import Koa from 'koa'
import koaLogger from 'koa-logger'
import pool from 'src/db'

console.log(pool)

const app = new Koa()

app.use(koaLogger())

app.use(async (ctx) => {
    ctx.body = 'Plain Text'
})

app.listen(8080)

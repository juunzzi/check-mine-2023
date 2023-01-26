import Koa from 'koa'
import koaLogger from 'koa-logger'

const app = new Koa()

app.use(koaLogger())

app.use(async (ctx) => {
    ctx.body = 'Plain Text'
})

app.listen(8080)

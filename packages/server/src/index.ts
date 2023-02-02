import 'src/env'

import Koa from 'koa'
import koaLogger from 'koa-logger'
import Logger from 'src/common/logger/winston'
import router from 'src/router'

const app = new Koa()

app.use(koaLogger())

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        Logger.error(error)
        ctx.status = 500
    }
})

app.use(router.routes())

app.listen(8080)

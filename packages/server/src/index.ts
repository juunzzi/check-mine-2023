import 'src/env'

import Koa from 'koa'
import koaLogger from 'koa-logger'
import router from 'src/router'

const app = new Koa()

app.use(koaLogger())

app.use(router.routes())

app.listen(8080)

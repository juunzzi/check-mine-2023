import 'src/env'

import Koa from 'koa'
import koaLogger from 'koa-logger'
import Logger from 'src/common/logger/winston'
import {initializeDB} from 'src/db'
import router from 'src/router'

// prettier-ignore
(async () => {
    try{
        await initializeDB();

        Logger.info('데이터베이스 셋업을 성공하였습니다.')
    }catch(error){
        Logger.error(error)
    }
})()

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

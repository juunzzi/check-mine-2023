import 'src/env'

import Koa from 'koa'
import koaLogger from 'koa-logger'
import Logger from 'src/common/logger/winston'
import {initializeDB} from 'src/db'
import router from 'src/router'

// prettier-ignore
(async () => {
    try {
        await initializeDB()

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

        Logger.info('데이터베이스 셋업 및 서버 구동이 완료되었습니다.')
    } catch (error) {
        Logger.error(error)
    }
})()

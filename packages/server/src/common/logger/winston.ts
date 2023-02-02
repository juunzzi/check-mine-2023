import {createLogger, format, transports} from 'winston'

import 'winston-daily-rotate-file'
import {join} from 'path'

const defaultFormat = format.combine(
    format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({stack: true}),
    format.simple(),
    format.colorize(),
)

const Logger = createLogger({
    format: defaultFormat,
    transports: [
        new transports.DailyRotateFile({
            filename: join('log', '%DATE%.log'),
            zippedArchive: true,
        }),
    ],
})

Logger.add(
    new transports.Console({
        format: defaultFormat,
    }),
)

export default Logger

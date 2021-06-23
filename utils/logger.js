import config from 'config'
import winston from 'winston'

const getLogger = () => {
    const MODE = config.get('mode')
    const LOG_PATH = config.get('logPath', './')

    const colors = {
        emerg: 'red',
        alert: 'red',
        crit: 'red',
        error: 'red',
        warning: 'yellow',
        notice: 'orange',
        info: 'cyan'
    }

    const transports = [new winston.transports.Console()]
    let format = null

    if (MODE === 'production') {
        transports.push(new winston.transports.File({ filename: `${LOG_PATH}/error.log`, level: 'error' }))
        transports.push(new winston.transports.File({ filename: `${LOG_PATH}/combined.log` }))

        format = winston.format.combine(
            winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
            winston.format.printf(info => `[server ${info.level}]: ${info.timestamp}: ${info.message}`)
        )
    } else {
        winston.addColors(colors)

        format = winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(info => `[server ${info.level}]: ${info.message}`)
        )
    }

    const logConfiguration = {
        level: 'info',
        transports, format
    }

    return winston.createLogger(logConfiguration)
}

export default getLogger()
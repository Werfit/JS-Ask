import pg from 'pg'
import config from 'config'

import { UNIQUE } from '../errors/db.js'

const client = new pg.Pool({
    user: config.get('dbUsername'),
    password: config.get('dbPassword'),
    host: config.get('dbHost'),
    database: config.get('dbName'),
    port: config.get('dbPort')
})

// TODO: add creating new database on run

export const dbErrorsHandler = err_code => {
    switch (err_code) {
        case UNIQUE:
            return { error: 'This username is taken already', code: err_code }
        default:
            return { error: 'Unkown error', code: err_code }
    }
}

export default client
import express from 'express'
import config from 'config'
import cors from 'cors'

import logger from './utils/logger.js'

import getRoutes from './routes/index.js'

const startApp = () => {
    const app = express()

    app.use(configuredCORS())
    app.use(express.json())
    app.use('/api/v1/', getRoutes())

    const PORT = config.get('port', 8000)
    app.listen(PORT, () => logger.info(`server is running on port ${PORT}`))
}

const configuredCORS = () => {
    const whiteList = config.get('CORSWhiteList')

    const options = {
        origin: (origin, cb) => {
            if (whiteList.indexOf(origin) !== -1)
                cb(null, true)
            else
                cb(new Error('Not allowed by CORS'))
        },
        optionsSuccessStatus: 200
    }

    return cors(options)
}

export default startApp
import jwt from 'jsonwebtoken'
import config from 'config'

import logger from '../utils/logger.js'

export const isAuthenticatedOnly = async (req, res, next) => {
    const tokenHeader = req.headers.authorization

    if (!tokenHeader)
        return res.status(403).json({ error: 'Not authenticated' })

    const token = tokenHeader.split(' ')[1]

    try {
        const isCorrect = jwt.verify(token, config.get('JWTSecretKey'))
        if (!isCorrect)
            return res.status(403).json({ error: 'Not Authenticated' })
    } catch (err) {
        logger.error(err)
        return res.status(500).json({ error: 'Unkown error' })
    }

    next()
}

export const notAuthenticatedOnly = async (req, res, next) => {
    const tokenHeader = req.headers.authorization

    if (tokenHeader)
        return res.status(403).json({ error: 'Not allowed' })

    next()
}
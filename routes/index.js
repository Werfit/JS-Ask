import { Router } from 'express'

import getAccountRoutes from './accounts.routes.js'
import getQuestionRoutes from './questions.routes.js'
import getProfileRoutes from './profiles.routes.js'

export default () => {
    const router = Router()

    router.use('/accounts/', getAccountRoutes())
    router.use('/questions/', getQuestionRoutes())
    router.use('/profiles/', getProfileRoutes())

    return router
}
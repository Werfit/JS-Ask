import { Router } from 'express'

import { getProfile, updateProfile } from '../controllers/profiles.controllers.js'
import { isAuthenticatedOnly } from '../middleware/permissions.middleware.js'

export default () => {
    const router = Router()

    router.get('/', isAuthenticatedOnly, getProfile)
    router.patch('/', isAuthenticatedOnly, updateProfile)

    return router
}
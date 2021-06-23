import { Router } from 'express'
import { body } from 'express-validator'

import { createUser, loginUser, loadUser, findUser, changePassword } from '../controllers/accounts.controllers.js'
import { isAuthenticatedOnly, notAuthenticatedOnly } from '../middleware/permissions.middleware.js'

export default () => {
    const router = Router()

    const validators = {
        username: body('username').isLength({ min: 4 }),
        passwordRegister: body('password').isStrongPassword({ minLength: 8, minSymbols: 0, minNumbers: 1, minLowercase: 1, minUppercase: 1 }),
        passwordLogin: body('password').isLength({ min: 8 })
    }

    // GET
    router.get('/user/', isAuthenticatedOnly, loadUser)

    // POST
    router.post(
        '/register/',
        notAuthenticatedOnly,
        validators.username,
        validators.passwordRegister,
        createUser
    )

    router.post(
        '/login/',
        notAuthenticatedOnly,
        validators.username,
        validators.passwordLogin,
        loginUser
    )

    router.post('/find/', findUser)

    // PATCH
    router.patch('/change/', changePassword)

    return router
}
import { Router } from 'express'
import { askQuestion, getQuestions, removeQuestion } from '../controllers/questions.controllers.js'
import { isAuthenticatedOnly } from '../middleware/permissions.middleware.js'

export default () => {
    const router = Router()

    router.post('/:target/new/', askQuestion)
    router.get('/all/', isAuthenticatedOnly, getQuestions)
    router.delete('/:question/remove/', isAuthenticatedOnly, removeQuestion)

    return router
}
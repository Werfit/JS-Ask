import sql, { dbErrorsHandler } from '../config/database.js'
import { USER_NOT_FOUND, NO_ACCESS } from '../errors/common.js'
import logger from '../utils/logger.js'
import { getUserData } from '../utils/token.js'

// @route       /api/v1/questions/:id/new/
// @method      POST
// @permissions Any
export const askQuestion = async (req, res) => {
    try {
        const user = getUserData(req.headers.authorization)

        const { rows: query_rows } = await sql.query('SELECT * FROM users WHERE id = $1;', [req.params.target])
        const target = query_rows[0]

        if (!target)
            return res.status(404).json(USER_NOT_FOUND)

        const { question: content, isAnonymous } = req.body

        const author = isAnonymous || !user ? 'unknown' : user.username

        await sql.query(
            'INSERT INTO questions (content, is_anonymous, author, user_id) VALUES ($1, $2, $3, $4);',
            [content, isAnonymous, author, target.id]
        )

        res.json({ success: true })

    } catch (err) {
        logger.error(err)
        res.status(500).json(dbErrorsHandler(err.code))
    }
}

// @route       /api/v1/questions/all/
// @method      GET
// @permissions Authenticated Only
export const getQuestions = async (req, res) => {
    try {
        const user = getUserData(req.headers.authorization)

        const { rows: query_rows } = await sql.query('SELECT * FROM questions WHERE user_id = $1;', [user.id])
        const questions = query_rows

        res.json({ questions })
    } catch (err) {
        logger.error(err)
        res.status(500).json(dbErrorsHandler(err.code))
    }
}

// @route       /api/v1/questions/:id/remove/
// @method      DELETE
// @permissions Authenticated only
export const removeQuestion = async (req, res) => {
    try {
        const user = getUserData(req.headers.authorization)

        const { rows: query_rows } = await sql.query('SELECT * FROM questions WHERE id = $1;', [req.params.question])
        const [question] = query_rows

        // Checking if user trying to remove a question is the owner
        if (question.user_id !== user.id)
            return res.status(404).json({ NO_ACCESS })

        await sql.query('DELETE FROM questions where id = $1;', [req.params.question])

        res.json({ success: true })
    } catch (err) {
        logger.error(err)
        res.status(500).json(dbErrorsHandler(err.code))
    }
}

// TODO: Add update 
import sql, { dbErrorsHandler } from '../config/database.js'
import logger from '../utils/logger.js'
import { getUserData } from '../utils/token.js'
import { createUpdateList } from '../utils/query.js'


// @route       /api/v1/profiles/
// @method      GET
// @permissions Authenticated only
export const getProfile = async (req, res) => {
    try {
        const user = getUserData(req.headers.authorization)

        const query = `
            SELECT first_name, last_name, TO_CHAR(birth_date, 'yyyy-MM-dd') birth_date, email 
            FROM profiles
            WHERE user_id = $1;
        `

        const { rows: query_rows } = await sql.query(query, [user.id])
        const [profile] = query_rows

        res.json({ profile })
    } catch (err) {
        logger.error(err)
        res.status(500).json(dbErrorsHandler(err.code))
    }
}

// @route       /api/v1/profile/
// @method      PATCH
// @permissions Authenticated Only
export const updateProfile = async (req, res) => {
    try {
        const user = getUserData(req.headers.authorization)
        const updateList = createUpdateList(req.body)
        const query = `
            UPDATE profiles
            SET ${updateList}
            WHERE user_id = $1
            RETURNING first_name, last_name, TO_CHAR(birth_date, 'yyyy-MM-dd') birth_date, email;
        `

        const { rows: query_rows } = await sql.query(query, [user.id])
        const [profile] = query_rows

        res.json({ profile })

    } catch (err) {
        logger.error(err)
        res.status(500).json(dbErrorsHandler(err.code))
    }
}
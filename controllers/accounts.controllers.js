import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import { validationResult } from 'express-validator'

import sql, { dbErrorsHandler } from '../config/database.js'
import { USER_NOT_FOUND, INCORRECT_CREDENTIALS, INVALID_DATA } from '../errors/common.js'
import logger from '../utils/logger.js'
import { getUserData } from '../utils/token.js'

// @route       /api/v1/accounts/register/
// @method      POST
// @permissions Not Authenticated Only
export const createUser = async (req, res) => {
    const errors = validationResult(req)

    if (errors)
        return res.status(400).json(INVALID_DATA)

    const { username, password } = req.body

    const user_data = [
        username, await bcrypt.hash(password, 8)
    ]

    try {
        const { rows: query_rows } = await sql.query(
            `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username;`,
            [...user_data]
        )
        const [user] = query_rows

        // Creates profile
        await sql.query('INSERT INTO profiles (user_id) VALUES ($1);', [user.id])
        const token = jwt.sign(user, config.get('JWTSecretKey'), { expiresIn: '1h' })

        res.json({ user, token })
    } catch (err) {
        logger.error(err)
        res.json(dbErrorsHandler(err.code))
    }
}

// @route       /api/v1/accounts/login/
// @method      POST
// @permissions Not Authenticated Only
export const loginUser = async (req, res) => {
    const errors = validationResult(req)

    if (errors.array().length)
        return res.status(400).json(INVALID_DATA)

    const { username, password } = req.body

    try {
        const { rows: query_rows } = await sql.query(`SELECT * FROM users WHERE username = $1;`, [username])
        const [found_user] = query_rows

        if (!found_user)
            return res.status(404).json(USER_NOT_FOUND)

        const isMatch = await bcrypt.compare(password, found_user.password)

        if (!isMatch)
            return res.status(400).json(INCORRECT_CREDENTIALS)

        const user = {
            id: found_user.id,
            username: found_user.username
        }

        const token = jwt.sign(user, config.get('JWTSecretKey'), { expiresIn: '1h' })

        res.json({ user, token })
    } catch (err) {
        logger.error(err)
        res.json(dbErrorsHandler(err.code))
    }
}

// @route       /api/v1/accounts/user/
// @method      GET
// @permissions Authenticated Only
export const loadUser = async (req, res) => {
    // TODO: Check if user exists
    const user = getUserData(req.headers.authorization)
    if (!user)
        res.status(400).json({ error: 'Error occured' })
    res.json({ user })
}


// @route       /api/v1/accounts/find/
// @method      POST
// @permissions Any
export const findUser = async (req, res) => {
    try {
        const username = req.body.username
        if (username.length === 0)
            return res.json({ users: [] })
        const { rows: users } = await sql.query(`SELECT id, username FROM users WHERE username LIKE '${username}%';`)

        res.json({ users })
    } catch (err) {
        logger.error(err)
        res.status(500).json(dbErrorsHandler(err.code))
    }
}

// @route       /api/v1/accounts/change/
// @method      PATCH
// @permissions Authenticated Only
export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body
        const { id } = getUserData(req.headers.authorization)

        const { rows: query_rows } = await sql.query('SELECT password FROM users WHERE id = $1', [id])
        const [user] = query_rows

        // Match between entered curernt password and real current password
        const isMatch = await bcrypt.compare(currentPassword, user.password)

        if (!isMatch)
            return res.status(400).json(INCORRECT_CREDENTIALS)

        const hash = await bcrypt.hash(newPassword, 8)
        await sql.query('UPDATE users SET password = $1 WHERE id = $2', [hash, id])

        res.json({ success: true })

    } catch (err) {
        logger.error(err)
        res.status(500), json(dbErrorsHandler(err.code))
    }
}


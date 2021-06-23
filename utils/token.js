import jwt from 'jsonwebtoken'

export const getUserData = authentication => {
    if (!authentication)
        return null

    const token = authentication.split(' ')['1']
    const user = jwt.decode(token)

    return user
}
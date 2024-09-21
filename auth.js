import jwt from 'jsonwebtoken'

export const auth = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}
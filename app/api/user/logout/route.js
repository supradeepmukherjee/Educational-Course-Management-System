import { cookies } from 'next/headers'
import { redis } from '@/redis'
import jwt from 'jsonwebtoken'

export async function GET(req) {
    try {
        cookies().delete('user')
        await redis.del(jwt.verify(req.cookies.get('user').value, process.env.JWT_SECRET).token)
        return Response.json({ msg: 'Logged Out Successfully' }, { status: 200 })
    } catch (err) {
        console.log(err)
        return Response.json({ err }, { status: 500 })
    }
}
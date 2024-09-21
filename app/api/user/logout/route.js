import { cookies } from 'next/headers'
import { redis } from '@/redis'
import jwt from 'jsonwebtoken'

export async function GET(req) {
    try {
        cookies().delete('user')
        // await redis.del()
        return Response.json({ msg: 'Logged Out Successfully' }, { status: 200 })
    } catch (err) {
        console.log(err)
        return Response.json({ err }, { status: 500 })
    }
}
import connectDB from '@/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redis } from '@/redis'

export async function POST(req) {
    try {
        connectDB()
        const res = await req.json()
        const { email, password } = res
        if (!email || !password) return Response.json({ msg: 'Email and Password Required' }, { status: 400 })
        const user = await User.findOne({ email }).select('+password')
        if (!user) return Response.json({ msg: 'Email or Password is Incorrect' }, { status: 401 })
        const matched = await bcrypt.compare(password, user.password)
        if (!matched) return Response.json({ msg: 'Email or Password is Incorrect' }, { status: 401 })
        const token = jwt.sign({ token: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        cookies().set('user', token)
        await redis.set(user._id, user)
        return Response.json({ user }, { status: 200 })
    } catch (err) {
        console.log(err)
        return Response.json({ err }, { status: 500 })
    }
}
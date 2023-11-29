import connectDB from '@/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(req) {
    try {
        connectDB()
        const res = await req.json()
        const { name, email, password, chavi } = res
        if (!name || !email || !password || !chavi) return Response.json({ msg: 'All fields are mandatory' }, { status: 400 })
        const exists = await User.findOne({ email })
        if (exists) return Response.json({ msg: 'Already Registered' }, { status: 400 })
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashed, chavi })
        const token = jwt.sign({ token: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        cookies().set('user', token)
        return Response.json({ user, token }, { status: 201 })
    } catch (err) {
        console.log(err)
        return Response.json({ err }, { status: 500 })
    }
}
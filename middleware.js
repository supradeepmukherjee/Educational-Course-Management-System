import { NextResponse } from 'next/server'
import { auth } from './auth'

export async function middleware(req) {
    const token = req.cookies.get('user')?.value
    if (!token) return NextResponse.redirect(new URL('/api/user/login', req.url))
    const decoded = auth(token)
    console.log(decoded)
    const response = NextResponse.next()
    response.headers.set('desi', 'checking')
    return response
}

export const config = {
    matcher: ['/api/user/logout', '/api/user/me']
}
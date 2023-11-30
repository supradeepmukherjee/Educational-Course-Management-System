import { NextResponse } from 'next/server'

export async function middleware(req) {
    const token = req.cookies.get('user')?.value
    if (!token) return NextResponse.redirect(new URL('/api/user/login', req.url))
    return NextResponse.next()
}

export const config = {
    matcher: ['/api/user/logout', '/api/user/me']
}
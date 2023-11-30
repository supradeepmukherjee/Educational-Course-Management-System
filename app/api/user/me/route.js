import User from '@/models/User'

export async function GET() {
    try {
        const user = await User.findById()
        return Response.json({ user }, { status: 200 })
    } catch (err) {
        console.log(err)
        return Response.json({ err }, { status: 500 })
    }
}
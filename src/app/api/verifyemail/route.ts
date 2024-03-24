import { connect } from "@/dbconfig/dbconfig"
import { NextRequest, NextResponse } from "next/server"
import User from '@/models/user'

connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token)
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({
                message: 'Token Expired',
                success: false
            });
        }

            user.isVerified = true
            user.verifyToken = undefined
            user.verifyTokenExpiry = undefined
            await user.save()
            return NextResponse.json({
                message: 'Token has been verify',
                success: true
            })
        

    } catch (error: any) {
        NextResponse.json({ message: 'Something went wrong!!!. Please try again later.' }, { status: 500 })
        console.log(error.message, error)
    }

}
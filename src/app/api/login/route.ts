import { connect } from "@/dbconfig/dbconfig";
import User from '@/models/user'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from "@/helpers/mailer";



connect()

export async function POST(request: NextRequest) {

    try {
        const reqbody = await request.json()
        console.log(reqbody)
        const { email, password } = reqbody

        const user = await User.findOne({ email })
        if (!user) {
            // Assuming you have access to the response object 'res'
            return NextResponse.json({ message: 'Invalid Email' ,
            success : false});
        }

        // let count = 5

        const comparedpassword: boolean = await bcryptjs.compare(password, user.password)

        

        if (comparedpassword) {
            let tokenData = {
                id: user._id,
                email: user.email,
                name: user.name
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
            const response = NextResponse.json({ message: "Login successfully", success: true })
            response.cookies.set("token", token, {
                httpOnly: false,
            })
            return response
        } else {
            return NextResponse.json({message : 'Incorrect Password' , success : false})
        }

    } catch (error: any) {
        return NextResponse.json({ message: 'Something went wrong on server. please try again later.', success : false })
    }

}
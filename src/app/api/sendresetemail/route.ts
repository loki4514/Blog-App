import { connect } from "@/dbconfig/dbconfig";
import User from '@/models/user'
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody  = await request.json()
        const { email }: { email: string }  = reqBody
        console.log(reqBody)

        const user = await User.findOne({email})
        console.log(user,'im calling an user here')

        if (!user) {
            return NextResponse.json({message : "Invalid Email. Please enter a valid one",
    success : false})
}

        const sentUser = {
            email: user.email,
            emailType: 'RESET',
            userId: user._id
        };

        sendEmail(sentUser)

        return NextResponse.json({message : 'Password reset mail has been sent your email, please check.',
    success : true})

    } catch (error : any) {
        return NextResponse.json({message : "Something went wrong!!!. please try again later"},{status : 500})
    }
    
}

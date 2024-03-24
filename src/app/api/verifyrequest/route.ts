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
            return NextResponse.json({message : "Invalid Email. No Account Exists for this email",
    success : false})
}
        if (user.isVerified === true) {
            return NextResponse.json({message : 'Account Already Verified',
                success : true})
        }
        else {
            const sentUser = {
                email: user.email,
                emailType: 'VERIFY',
                userId: user._id
            };
    
            sendEmail(sentUser)
    
            return NextResponse.json({message : 'Account verification link is sent, please check you email',
        success : true})

        }

        

    } catch (error : any) {
        return NextResponse.json({message : "Something went wrong!!!. please try again later"},{status : 500})
    }
    
}

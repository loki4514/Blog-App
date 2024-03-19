import { connect } from "@/dbconfig/dbconfig";
import User from '@/models/user'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from "@/helpers/mailer";




connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {token,password} = reqBody
        const user = await User.findOne({forgotPasswordToken : token , forgotPasswordTokenExpiry : {$gt : Date.now()}})

        if (!user) return NextResponse.json({message : "Token expired",
    success : false})

        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password,salt)

        user.password = hashpassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save()
        return NextResponse.json({message : 'Password changes was successful',
    success : true})

    } catch (error : any) {
        return NextResponse.json({message : 'Something went wrong!!!. Please try again later.'},{status : 500})

    }
    
}
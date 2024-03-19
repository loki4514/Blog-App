import { connect } from "@/dbconfig/dbconfig";
import User from '@/models/user'
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";
import { AxiosError } from 'axios';
import { Exception } from "sass";


connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody: { name: string; email: string; password: string } = await request.json();
        const { name, email, password } = reqBody;

        console.log(reqBody)

        const user = await User.findOne({email})

        if (user){ return NextResponse.json({message : "Email already exists!!!. Please try with different email",success : false}) }

        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            name,
            email,
            password: hashpassword
        })

        console.log(newUser)

        const savedUser = await newUser.save()

        console.log("saved user",savedUser)

        await sendEmail({email, emailType : "VERIFY",
            userId : savedUser._id})

        return NextResponse.json({
            message : 'User created successfully',
            success : true,
        })


    } catch(error : any ) {
        return NextResponse.json({error : error.message},{status : 500})
    }
    
}
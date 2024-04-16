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
        const reqBody: { name: string; email: string; password: string,confirm_password : string  } = await request.json();
        const { name, email, password,confirm_password  } = reqBody;

        if (name === '' || email === "" || password === ""|| confirm_password === "") {
            return NextResponse.json({message : "Please enter all the fields", success : false})
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            return NextResponse.json({message : "Invalid email address", success : false})
        }
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password)){
            return NextResponse.json({message : "Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long", success : false})
        }
        if (password !== confirm_password){
            return NextResponse.json({message:"Password and Confirm Password must be same",success : false})
        }


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
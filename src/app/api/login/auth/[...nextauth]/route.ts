import { connect } from '@/dbconfig/dbconfig';

import User from '@/models/user'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from "@/helpers/mailer";
import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from 'next-auth';
import  CredentialsProvider  from "next-auth/providers/credentials";

connect()

const GOOGLE_CLIENT_ID = process.env.google_outh_client_id
const GOOGLE_CLIENT_SECRET = process.env.google_outh_client_sec

export const authOptions: NextAuthOptions = {
    
    providers: [
        CredentialsProvider({
            name: "crendentials",
            credentials: {},
            async authorize(credentials,req): Promise<any> {
                const { email, password } = credentials as {
                  email: string;
                  password: string;
                };
                try {
                    const user = await User.findOne({ email })
                    if (!user) {
                        // Assuming you have access to the response object 'res'
                        return NextResponse.json({message : "No user found"})
                    }

                    // let count = 5

                    const comparedpassword: boolean = await bcryptjs.compare(password, user.password)



                    if (comparedpassword) {
                        return user
                    } else {
                        return NextResponse.json({message : "Incorrect Password"})
                    }
                } catch (error: any) {
                    console.log("Error:", error)
                }
            }

        }),
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID!,
            clientSecret: GOOGLE_CLIENT_SECRET!
        })
    ],

    session: {
        strategy: 'jwt'
    },

    callbacks: {
        // user already exists or create new account
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email
                token.name = user.name
                token.id = user.id
                token.picture = user.image
            }
            return token
        },
        async session({ session, token }: { session: any, token: any }) {
            if (session.user) {
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.id = token.id;
                session.user.image = token.picture;
            }
            console.log(session)
            return session
        }
    },
    secret : process.env.NEXTAUTH_SECRET!,
    pages : {
        signIn : '/login'
    }

}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

// export async function POST(request: NextRequest) {

//     try {
//         const reqbody = await request.json()
//         console.log(reqbody)
//         const { email, password } = reqbody

//         const user = await User.findOne({ email })
//         if (!user) {
//             // Assuming you have access to the response object 'res'
//             return NextResponse.json({
//                 message: 'Invalid Email',
//                 success: false
//             });
//         }

//         // let count = 5

//         const comparedpassword: boolean = await bcryptjs.compare(password, user.password)



//         if (comparedpassword) {
//             let tokenData = {
//                 id: user._id,
//                 email: user.email,
//                 name: user.name
//             }
//             const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })
//             const response = NextResponse.json({ message: "Login successfully", success: true })
//             response.cookies.set("token", token, {
//                 httpOnly: false,
//             })
//             return response
//         } else {
//             return NextResponse.json({ message: 'Incorrect Password', success: false })
//         }
//     } catch (error: any) {
//         return NextResponse.json({ message: 'Something went wrong on server. please try again later.', success: false })
//     }

// }
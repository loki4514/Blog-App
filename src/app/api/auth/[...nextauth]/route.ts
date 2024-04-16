import { connect } from '@/dbconfig/dbconfig';

import User from '@/models/user'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from "@/helpers/mailer";
import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { error } from 'console';

connect()

const GOOGLE_CLIENT_ID = process.env.google_outh_client_id
const GOOGLE_CLIENT_SECRET = process.env.google_outh_client_sec

export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: "crendentials",
            credentials: {},
            async authorize(credentials, req): Promise<any> {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                try {
                    const user = await User.findOne({ email })
                    if (!user) {
                        // Assuming you have access to the response object 'res'
                        return null
                    }


                    const comparedpassword: boolean = await bcryptjs.compare(password, user.password)



                    if (!comparedpassword) {
                        return null
                    }
                    
                    return user;
                    
                } catch (error: any) {
                    console.log("Error:", error)
                    return null
                }
            }

        }),
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID! as string,
            clientSecret: GOOGLE_CLIENT_SECRET! as string
        })
    ],

    session: {
        strategy: 'jwt'
    },

    callbacks: {

        async signIn({ user, account }: { user: any; account: any }) {
            if (account.provider === "google" && user) {
                try {
                    
                    const { name, email }: { name: string; email: string } = user;
                  
        
                  // Ensure database connection
        
                    // Check if the user already exists in the database
                    const existingUser = await User.findOne({ email });
                    // console.log(existingUser, "existing user");
        
                    if (existingUser) {
                        console.log("User already exists.",user,existingUser);
                        return existingUser; // Return existing user
                    }
        
                    // User doesn't exist, create a new user
                    const newUser = new User({
                        name: name,
                        email: email,
                        isVerified: true // You may adjust this as needed
                    });
        
                    // Save the new user to the database
                    const savedUser = await newUser.save();
                    // console.log("New user created:", savedUser);
        
                    return savedUser; // Return the newly created user
                } catch (error) {
                    console.error("Error in Google OAuth signIn callback:", error);
                    return null; // Return null if an error occurs
                }
            }
        else {
            console.log("why is i'm getting called here")
            return user;

        }
        
        },
        // user already exists or create new account
        async jwt({ token, user }) {
            if (user) {
                console.log(user,"this failed in every aspect of my life 0001")
                token.email = user.email
                token.name = user.name
                token.id = user.id
                // token.picture = user.image
            }
            if (!user) {
                console.log(user,"this failed in every aspect of my life 0002")
                token.error = "Invalid Credentials"
                token.errorStatus = 401; // Set error status code
            }
            return token
        },
        async session({ session, token }: { session: any, token: any }) {
            if (session.user) {
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.id = token.id;
                // session.user.image = token.picture;
            }
            // console.log(token, "thisis is the absolute token")
            return session

        }
    },
    secret: process.env.NEXTAUTH_SECRET!,
    pages: {
        signIn: '/login'
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
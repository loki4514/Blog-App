"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {useForm} from 'react-hook-form'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { duration } from "moment";


type 

export default function LoginPage() {
    const route = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const [errors, SetErrors] = useState<{email : string, password : string}>({
        email : "",
        password : ""
    })

    const [buttonClicked, setButtonClicked] = useState(false);
    console.log(buttonClicked, "before")

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonClicked(true)
        }
        else {
            setButtonClicked(false);
        }
    }, [user,buttonClicked])


    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }));
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        SetErrors({email : "", password :""})

        if (!user.email.includes("@")){
            SetErrors({...errors, email : "Email must include @"})
            return
        }

        if (!user.password){
            SetErrors({...errors, password : "Enter password"})
            return
        }



        try {
            const response : any = await axios.post('/api/login', {
                email : user.email,
                password : user.password
            })
            const responseData = response.data;
            console.log(responseData)

            if (responseData.success) {
                toast.success("Login Sucessful")
                setTimeout(() => {
                    route.push('/')
                }, 1500);
                
            }
            else {
                toast.error(responseData.message);
            }

        } catch (error: any) {
            toast.error("Something went wrong from front end")
        }

    }
    console.log(user)



    return (
        <>
            <Toaster position="top-center" 
            
            reverseOrder={false} />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2" src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/comment-blog-icon.png" alt="logo" />
                    Blog App
                </a>
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-black text-center md:text-2xl">
                            Sign in
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={submit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" name="email" id="email"
                                value={user.email}
                                onChange={change}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                            {errors.email && <div className="text-red-500">{errors.email}</div>}
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                value={user.password}
                                onChange={change}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                            {errors.password && <div className="text-red-500">{errors.password}</div>}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="text-black">Remember me</label>
                                    </div>
                                </div>
                                <button
                                onClick={() => route.push('/sendResetEmail')}
                                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?
                                </button>
                            </div>
                            <button type="submit" 
                           
                            className="bg-transparent block mx-auto font-bold text-center hover:bg-gray-500 text-black-700  hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">Sign In</button>
                            <p className="text-center">
                                Don’t have an account yet? <div className="text-center text-decoration-line: underline">
                                    <Link href='/signup'>Sign Up</Link>
                                </div>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
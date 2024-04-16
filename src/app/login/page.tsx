"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { duration } from "moment";
import { signIn } from 'next-auth/react';
import { error } from "console";

// 
type FormFields = {
    email: string;
    password: string


}

export default function LoginPage() {
    const route = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const [errors, SetErrors] = useState<{ email: string, password: string }>({
        email: "",
        password: ""
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
    }, [user, buttonClicked])


    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }));
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        SetErrors({ email: "", password: "" });

        if (!user.email) {
            SetErrors({ ...errors, email: "Please enter email field" });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(user.email)) {
            SetErrors({ ...errors, email: "Invalid email format" });
            return;
        }

        if (user.password.length < 2) {
            SetErrors({ ...errors, password: "Enter password" });
            return;
        }

        try {
            const res: any = await signIn('credentials', {
                email: user.email,
                password: user.password,
                redirect: false
            });
            console.log(res)

            if (res?.error) {
                toast.error("Invalid Credentials")
                console.log(res)

            } else {
                toast.success("Login Successful")
                setTimeout(() => {
                    route.push('/');
                }, 1500);
            }



            // const responseData = response.data;
            // console.log(responseData);

            // if (responseData.success) {
            //     toast.success("Login Successful");
            //     setTimeout(() => {
            //         route.push('/');
            //     }, 1500);
            // } else {
            //     toast.error(responseData.message);
            // }
        } catch (error: any) {
            toast.error("Something went wrong from the front end");
        }
    };

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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                {errors.password && <div className="text-red-500">{errors.password}</div>}
                            </div>
                            <div className="flex flex-row items-center justify-center border-2 rounded-3xl h-[50px]">
                                <button className="flex items-center" onClick={() => signIn("google",{ callbackUrl: "/redirect-url-after-login" })}>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="24" height="24">
                                        <defs>
                                            <path id="A" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                                        </defs>
                                        <clipPath id="B">
                                            <use xlinkHref="#A" />
                                        </clipPath>
                                        <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
                                            <path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05" />
                                            <path d="M0 11l17 13 7-6.1L48 14V0H0z" clipPath="url(#B)" fill="#ea4335" />
                                            <path d="M0 37l30-23 7.9 1L48 0v48H0z" clipPath="url(#B)" fill="#34a853" />
                                            <path d="M48 48L17 24l-4-3 35-10z" clipPath="url(#B)" fill="#4285f4" />
                                        </g>
                                    </svg>
                                    <span className="ml-2">Continue With Google</span>
                                </button>
                            </div>
                            <div className="flex items-center justify-between">

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
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


export default function SignUpPage() {
    const router = useRouter()
    const [user,setUser] = useState({
        name : '',
        email : '',
        password : '',
        confirm_password : ''
    })

    const [buttonClicked,setButtonClicked] = useState(false)

    useEffect(() => {
        if(buttonClicked && (user.name.length !== 0 || user.email.length !== 0 || user.password.length !== 0 || user.confirm_password.length !== 0)) {
            toast.error(`Please fill in all the fields`)
        } else {
            setButtonClicked(false)
        }
    }, [user, buttonClicked]);

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevUser => ({ ...prevUser, [e.target.name]: e.target.value }));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (user.password !== user.confirm_password) {
                toast.error("Password not same")
            }
            else {
            const response: any = await axios.post('/api/signup', {
                name: user.name,
                email: user.email,
                password: user.password
            });
    
            console.log(response.data);
    
            const responseData = response.data;
    
            if (responseData.success) {

                toast.success(responseData.message);
                setTimeout(() => {
                    router.push('/login')
                },1500)
            } else {
                toast.error(responseData.message);
            }
        }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    };
    
    console.log(user)

    return (
        <>
            
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                        <img className="w-8 h-8 mr-2" src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/comment-blog-icon.png" alt="logo" />
                        Blog App
                    </a>
                    <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-black text-center md:text-2xl"> 
                                Sign Up
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                                    <input type="text" name="name" id="email" 
                                    value={user.name}
                                    onChange={change}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hello" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                    <input type="email" name="email" id="email" 
                                    value = {user.email}
                                    onChange={change}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" 
                                    value = {user.password}
                                    onChange={change}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                    <input type="password" name="confirm_password" id="password" placeholder="••••••••" 
                                    value = {user.confirm_password}
                                    onChange={change}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>

                                
                                <button type="submit" 
                                onClick={() => setButtonClicked(true)}
                                className="bg-transparent block mx-auto font-bold text-center hover:bg-gray-500 text-black-700  hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">Register</button>
                                <p className="text-center">
                                    Already have an account yet? 
                                    <div className="text-center text-decoration-line: underline">
                                    <Link href='/login'>Sign In</Link>
                                </div>
                                </p>
                                <Toaster position="top-center" reverseOrder={false} />
                                
                            
                                    
                            </form>
                        </div>
                    </div>
                </div>
            
        </>
    )
}
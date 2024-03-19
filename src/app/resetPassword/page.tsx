"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";

export default function ResetPassword() {
    const router = useRouter()
    const [info, setInfo] = useState({
        token: '',
        password: '',
        confirm_password: '',
    })
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        if (urlToken) {
            setInfo({ ...info, token: urlToken });
        } else {
            setInfo({ ...info, token: '' });
        }
    },[])

    const [buttonClicked, setButtonClicked] = useState(false);

    useEffect(() => {
        if (buttonClicked && (info.password.trim().length === 0 || info.confirm_password.trim().length === 0)) {
            toast.error("Please enter a valid value for all fields");
            setButtonClicked(false); // Reset button click state
        }
    }, [info, buttonClicked]);



    const change = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInfo((prevInfo) => ({...prevInfo, [e.target.name]: e.target.value}))

    }

    const ResetPassword = async (e : React.FormEvent<HTMLFormElement>) =>  {
        e.preventDefault()
        try {
        if (info.password !== info.confirm_password) {
            toast.error("Password don't match")
        }
        else {
            interface res {
                message : string;
                success : boolean;
            }
            const response = await axios.post('/api/resetpassword',
            {
                token : info.token,
                password : info.password
            })

            const responseData :  res = response.data

            if(responseData.success) {
                toast.success(responseData.message)
                router.push('/login')
            }
            else {
                toast.error(responseData.message)
            }
        }
        } catch (error : any) {
            toast.error("Something went wrong")
        }


    }
    console.log(info)



    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-black text-center md:text-2xl">
                            Reset password
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={ResetPassword}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="password" name="password" id="password"
                                value={info.password}
                                onChange={change}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                
                                <input type="password" name="confirm_password" id="password" placeholder="••••••••"
                                value={info.confirm_password}
                                onChange={change}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <button type="submit" 
                            onClick={() => setButtonClicked(true)}
                            className="bg-transparent block mx-auto font-bold text-center hover:bg-gray-500 text-black-700  hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">Reset Password</button>
                            
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

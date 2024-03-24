"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SendResetEmail() {
    const route = useRouter()
    const [email, setEmail] = useState('')
    console.log(email)

    const submit = async () => {
        console.log("I'm calling");
    
    
        interface res {
            message: string;
            success: boolean;
        }
    
        try {
            const response = await axios.post('/api/verifyrequest', {email} );
            const responseData: res = response.data;
            console.log(response);
    
            if (responseData.success) {
                toast.success(responseData.message);
                route.push('/login');
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.error('Error occurred:', error);
            toast.error('An error occurred while processing your request.');
        }
    };


    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center space-y-5">
                    <h1 className="text-3xl font-bold text-center">Verify Account</h1>

                    <input
                        className="w-full max-w-md p-3 border border-gray-300 rounded-md"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                        onClick={ submit}
                    >
                        Verify
                    </button>
                </div>
            </div>


        </>
    )
}

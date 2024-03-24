"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast,{ Toaster } from "react-hot-toast";



export default function verifyEmailPage() {
    
    const router = useRouter()
    const [token,setToken] = React.useState("")
    const [verified, setVerified] = React.useState(false)
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false)

    const verifyUserEmail = async () => {
        try {
            interface res {
                message : string;
                success : boolean

            }
            const response : any = await axios.post('/api/verifyemail',{token})
            console.log(response.data, "this is from backend of verify email")

            const responseData : res = response.data
            console.log(responseData,"after json")
            if (responseData.success) {
                setVerified(true)
                setLoading(true)
                toast.success("Account has been verified")
            }
            else {
                setLoading(true)
                toast.error(responseData.message + ' you account is at stake')
            }

        } catch(error : any){
            setError(true)
            console.log(error.response.data);
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    },[])

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail()
        }
    },[token])
    console.log(verified)
    console.log(token)

    return (
        <>
        <Toaster position="top-center" reverseOrder={false} />
        {!loading ? (
    <div className="flex flex-col items-center justify-center py-2">
        <h3>Loading please wait....</h3>
    </div>
) : (
    verified ? (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h3 className="sm:text-4xl">Email Verified</h3>
            <button
                className="sm:mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => router.push('/login')}
            >
                Login
            </button>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h3 className="sm:text-4xl">Looks like your verification link has expired</h3>
            <p>No worries, click the button below for a new Verification link.</p>
            <button
            onClick={() => router.push('/verifyAccount')}
                className="sm:mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
                Generate Verification Request
            </button>
        </div>
    )
)}

        </>
    )
}
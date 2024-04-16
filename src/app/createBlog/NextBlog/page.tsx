"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { useEditor, EditorContent } from '@tiptap/react'
import Tiptap from "@/app/TipTap/page";

// import StarterKit from '@tiptap/starter-kit'


export default function Blog() {
    const [selectedOption, setSelectedOption] = useState('');
    const route = useRouter()
    console.log(selectedOption)

    const handleChange = (event: any) => {
        setSelectedOption(event.target.value);
    }
    const [content,setcontent] = useState<string>('')
    const handleChange1 = (reason : any) => {
        setcontent(reason)

    }


        return (
            <>
                <div className="w-4/5 mx-auto h-100 border-4 rounded-3xl">
                    <div className="rounded-3xl m-5">
                        <h1 className="text-center font-extrabold text-3xl pb-5">
                            Create Blog
                        </h1>
                        <form className="space-y-4 md:space-y-6 w-4/5 mx-auto h-100" action="#" >
                            <div>
                                <Tiptap content={content} 
                                onChange = {(newcontent:string) => handleChange1(newcontent)}/>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900">Tags</label>
                                <input
                                    type="text"
                                    name="reading_time"
                                    id="reading_time"
                                    placeholder="10 mins"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </form>
                        

                    </div>
                    <div className="flex  justify-center">
                    <button
                    onClick={() => route.push("/createBlog")}
                     type="button" className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Previous</button>
                    </div>
                </div>
                
                <br />


            </>
        )
    }
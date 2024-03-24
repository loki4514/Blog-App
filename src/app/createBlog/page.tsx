"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { useEditor, EditorContent } from '@tiptap/react'
import Tiptap from "../TipTap/page";

// import StarterKit from '@tiptap/starter-kit'


export default function CreateBlog() {
    const [selectedOption, setSelectedOption] = useState('');
    console.log(selectedOption)

    const handleChange = (event: any) => {
        setSelectedOption(event.target.value);
    }
    const [content,setcontent] = useState<string>('')
    const handleChange1 = (resaon : any) => {
        setcontent(resaon)

    }


        return (
            <>
                <div className="w-4/5 mx-auto h-100 border-4 rounded-3xl">
                    <div className="rounded-3xl m-5">
                        <h1 className="text-center font-extrabold text-3xl">
                            Create Blog
                        </h1>
                        <form className="space-y-4 md:space-y-6 w-4/5 mx-auto h-100" action="#" >
                            <div className="">
                                <label className="block mb-2 text-sm  font-bold text-gray-900">Enter Your Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="AI SUCKS"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900">Estimated Reading Time</label>
                                <input
                                    type="text"
                                    name="reading_time"
                                    id="reading_time"
                                    placeholder="10 mins"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-bold text-gray-900">Blog Type</label>
                                <input
                                    type="text"
                                    name="reading_time"
                                    id="reading_time"
                                    placeholder="10 mins"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-bold" htmlFor="file_input">Featured Image</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" id="file_input" type="file" />
                            </div>

                            <div>
                                <label htmlFor="countries" className="block mb-2 text-sm font-bold text-gray-900">Select an option</label>
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a country</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                </select>
                            </div>
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
                </div>
                <br />


            </>
        )
    }
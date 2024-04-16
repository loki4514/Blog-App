"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";
import { useEditor, EditorContent } from '@tiptap/react'
import Tiptap from "../TipTap/page";
import NextBlog from "./NextBlog/page"
import { z } from "zod"
import FileBase from "react-file-base64";
import { WithContext as ReactTags } from 'react-tag-input';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';


// import StarterKit from '@tiptap/starter-kit'
interface addingTags {
    id : string;
    text : string;
}

export default function CreateBlog() {
    const ACCEPTED_IMAGE_TYPES: string[] = ["jpeg", "jpg", "png", "webp"];
    const MAX_FILE_SIZE = 1024 * 1024 * 5;
    const ACCEPTED_IMAGE_MIME_TYPES = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
    ];

    const tagsSchema = z.object({
        id : z.string(),
        text : z.string()
    })

    const schema = z.object({
        blog: z.string({ required_error: "Please enter a blog content, it cannot be empty!!!" }).min(50, { message: "Blog content should be atleast minimum 50 characters" }),
        title: z.string().min(5, { message: "Title should be atleast minimum 5 characters" }),
        reading_time: z.string({ required_error: "Reading Time required" }),
        featured_image: z
            .any()
            // To not allow empty files
            .refine((files) => files?.length >= 1, { message: 'Image is required.' })
            // To not allow files other than images
            .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
                message: '.jpg, .jpeg, .png and .webp files are accepted.',
            })
            // To not allow files larger than 5MB
            .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
                message: `Max file size is 5MB.`,
            }),
        blog_cat: z.string({required_error : "Please select one of blog cateogry"}).min(6, {message :  "Please select one of blog cateogry"} ),
        tags: z.any()

        

    })



    console.log(z.array(tagsSchema))
    // const [selectedOption, setSelectedOption] = useState('');
    // console.log(selectedOption)
    const router = useRouter()

    // const handleChange = (event: any) => {
    //     setSelectedOption(event.target.value);
    // }



    const [something, setSomething] = useState({
        blog: "",
        title: "",
        reading_time: "10",
        // blog_time: "",
        featured_image: "",
        blog_cat: "",
        tags: [] as addingTags[]

    })

    type Formfield = z.infer<typeof schema>




    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSomething(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }



    // const [content, setcontent] = useState<string>('')
    // const handleChange1 = (reason: any) => {
    //     setcontent(reason)

    // }

    
    

    const HandleAddition = (tagToAdd: addingTags ) => {
        console.log(tagToAdd,"hi i'm adding tags")
        
        setSomething((prevState: typeof something) => ({
            ...prevState,
            tags: [...prevState.tags, tagToAdd]
        }));
    };
    const HandleDeletion = (i: number) => {
        setSomething((prevState: typeof something) => ({
            ...prevState,
            tags: prevState.tags.filter((_, index) => index !== i)
        }));
    };

    const { register, handleSubmit, formState: { errors } } = useForm<Formfield>({
        resolver: zodResolver(schema)
    });

    const blogSubmit: SubmitHandler<Formfield> = async () => {
        console.log("iam getting called")
        console.log(something); // Data will only be logged if validation succeeds
        // Perform your API call or other actions here
        try {

        } catch (error: any) {
            console.log(error)
        }
    };

    console.log(errors)

    console.log(something.tags.length)

    return (
        <>
            <div className="w-4/5 mx-auto h-100 border-4 rounded-3xl">
                <div className="rounded-3xl m-5">
                    <h1 className="text-center font-extrabold text-3xl">
                        Create Blog
                    </h1>
                    <br />
                    <form className="space-y-4 md:space-y-6 w-4/5 mx-auto h-100 " onSubmit={handleSubmit(blogSubmit)}>
                        <div className="">

                            <Tiptap content={something.blog}
                                {...register("blog")}
                                onChange={(newcontent: string) => setSomething({ ...something, blog: newcontent })} />
                        </div>
                        {errors.blog && <p className="text-red-500">{errors?.blog?.message?.toString()}</p>}
                        <div className="">
                            <label className="block mb-2 text-sm  font-bold text-gray-900">Enter Your Title</label>
                            <input
                                type="text"
                                // name="title"
                                {...register("title")}
                                value={something.title}
                                onChange={change}
                                id="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="AI SUCKS"
                            />
                            {errors.title && <p className="text-red-500">{errors?.title?.message?.toString()}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-bold text-gray-900">Estimated Reading Time</label>
                            <input
                                type="text"
                                // name="reading_time"
                                {...register('reading_time')}
                                value={something.reading_time}
                                onChange={change}
                                id="reading_time"
                                placeholder="10 mins"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {errors.reading_time && <p className="text-red-500">{errors?.reading_time?.message?.toString()}</p>}
                        </div>
                        {/* <div>
                            <label className="block mb-2 text-sm font-bold text-gray-900">Blog Type</label>
                            <input
                                type="text"
                                name="blog_type"

                                placeholder="Tech Blog"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div> */}


                        <div>
                            <label className="block mb-2 text-sm font-bold" htmlFor="file_input">Featured Image</label>

                            {/* <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" id="file_input" type="file" /> */}
                            <FileBase
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="file"
                                {...register('featured_image')}
                                multiple={false}
                                onDone={(file: string) => setSomething({ ...something, featured_image: file })}

                            />
                            {errors.featured_image && <p className="text-red-500">{errors?.featured_image?.message?.toString()}</p>}

                        </div>

                        <div>
                            <label htmlFor="BlogType" className="block mb-2 text-sm font-bold text-gray-900">Blog Category</label>
                            <select id="blog_type"
                                {...register('blog_cat')}
                                value={something.blog_cat}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSomething({ ...something, blog_cat: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value = "">Choose a Blog Type</option>
                                <option value="Food Blogs">Food Blogs</option>
                                <option value="Technology Blog">Technology Blog</option>
                                <option value="Travel Blogs">Travel Blogs</option>
                                <option value="Personal Blogs/LifeStyle Blog">Personal Blogs/LifeStyle Blog</option>
                                <option value="Business Blog">Business Blog</option>
                            </select>
                            {errors.blog_cat && <p className="text-red-500">{errors?.blog_cat?.message?.toString()}</p>}
                        </div>
                        
                        {/* <div>
                                
                                <Tiptap content={content} 
                                onChange = {(newcontent:string) => handleChange1(newcontent)}/>
                            </div> */}
                        <div>
                            <label className="block mb-2 text-sm font-bold text-gray-900">Tags</label>
                            {/* <input
                                type="text"
                                name="tags"
                                value={something.tags}
                                onChange={change}
                                id="reading_time"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            /> */}
                            <ReactTags
                                classNames={{
                                    tags: "flex flex-wrap",
                                    tag: "bg-gray-50 mb-5 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 mb-2 mr-2",
                                    remove: "text-gray-400 ml-2",
                                    suggestions: "bg-white border border-gray-300 rounded-lg shadow-md z-10 absolute",
                                    activeSuggestion: "cursor-pointer bg-gray-100",
                                }}
                                {...register("tags")}
                                tags={something.tags}
                                handleAddition={HandleAddition}
                                handleDelete={HandleDeletion}
                                inputFieldPosition="bottom"
                                autocomplete
                                inputFieldClass="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            {errors.tags && <p className="text-red-500">{errors?.tags?.message}</p>}





                        </div>
                        <div className="flex  justify-center">
                            <button
                                type="submit"

                                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Submit</button>
                        </div>
                    </form>
                </div>

            </div>
            <br />


        </>
    )
}
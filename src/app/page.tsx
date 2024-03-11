"use client";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {
    const [user, SetUser] = useState(false)
    const [menu, setMenu] = useState(false)
    const router = useRouter()

    const posts = [
        { title: 'React Testing', excerpt: 'Learn react testing' },
        { title: 'React Testing', excerpt: 'Learn react testing' },
        { title: 'React Testing', excerpt: 'Learn react testing' },
        { title: 'React Testing', excerpt: 'Learn react testing' }

    ]
    return (
        <>
            <nav className="bg-[#EEEEEE] border-2 ring-slate-900">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-1">
                    <div className="relative flex h-16 items-center justify-between">
                        <h1 className="pr-5 font-extrabold text-3xl font-mono">Blog App</h1>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">

                                <img className="w-8 h-8 mr-2" src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/comment-blog-icon.png" alt="logo" />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">

                                    <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Create Blog</a>
                                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</a>
                                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
                                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">View notifications</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                            </button> */}

                            {user ? (<div className="relative ml-3">
                                <div>
                                    <button type="button"
                                        className={`relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2   ${menu ? "focus:ring-white focus:ring-offset-2" : "focus:ring-offset-gray-800"} `}
                                        id="user-menu-button" aria-expanded="false"
                                        aria-haspopup="true"
                                        onClick={() => setMenu(!menu)}>
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                    </button>
                                </div>


                                {menu && (<div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>

                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-1">Settings</a>
                                    <a href="#" className="block px-4 
                                    React TestingLearn react testingpy-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</a>
                                </div>)}
                            </div>) : (

                                <button
                                    onClick={() => router.push('/login')}
                                    className="bg-transparent  hover:bg-gray-500 text-black font-bold  hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded-lg">Login</button>

                            )}
                        </div>
                    </div>
                </div>



                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">

                        <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Create Blog</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-10 mb-8 bg-gray-300 ">
                <title>Blog App</title>
                <link rel="icon" href="favion.ico" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {posts.map((post, idx) => (
                    <div>
                        {post.title}
                        {post.excerpt}
                    </div>

                ))}

            </div>
        </>
    );
}

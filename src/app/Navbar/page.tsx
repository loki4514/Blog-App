"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { JwtPayload, jwtDecode } from "jwt-decode"
import Avatar from 'react-avatar';
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {

    const {data:session} = useSession()
    
    

    interface User {
        id: string;
        email: string;
        name: string;
        iat: number;
        exp: number;
    }
    const [user, setUser] = useState(false)
    const [extUser, setExtUser] = useState<User | undefined>()
    const [menu, setMenu] = useState(false)
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const router = useRouter()

    const toggleMenu = () => {
        setMenu(!menu)
    }

    const myToken = Cookies.get("token");


    useEffect(() => {
        const getUser = Cookies.get("token");
        console.log("i have been summoned from navbar");
        if (getUser) {
            setUser(true)
            let decodedToken = jwtDecode(getUser);
            let somevar: User = JSON.parse(JSON.stringify(decodedToken));
            setExtUser(somevar);
            setUser(true); // Update user state only when the user logs in
        }
    }, [user]); // Remove [user] from the dependency array

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (!menu || e.target.closest('.relative.flex.rounded-full')) return; // Ignore clicks within toggler or dropdown
            setMenu(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside); // Cleanup on unmount
    }, [menu]);

    const logout = () => {
        signOut()
        router.push("/login")
    }

    return (
        <>
            <nav className="bg-[#EEEEEE] border-2 ring-slate-900">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-1">
                    <div className="relative flex h-16 items-center sm:justify-between">
                        <h1 className="sm:pr-5 font-extrabold text-3xl font-mono mb-2 sm:mb-0">Blog App</h1>
                        <button onClick={() => router.push("/")} className="lg:pl-2">
                                    <img className="w-8 h-8 sm:mr-2" src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/comment-blog-icon.png" alt="logo" />
                                </button>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            {/* <div className="flex flex-shrink-0 lg:items-center"> */}
                                {/* <button onClick={() => router.push("/")}>
                                    <img className="w-8 h-8 sm:mr-2" src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/comment-blog-icon.png" alt="logo" />
                                </button> */}
                            {/* </div> */}
                        </div>

                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="relative ml-3 sm:pr-3">
                                <Link href="/createBlog">
                                    <div data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom"
                                        onMouseEnter={() => setIsTooltipVisible(true)}
                                        onMouseLeave={() => setIsTooltipVisible(false)}
                                        className="ms-3 mb-2 md:mb-0">
                                        <div id="tooltip-bottom" role="tooltip" 
                                        className={`absolute left-1/2 transform -translate-x-1/2 top-full -translate-y-1 w-max px-3 py-2 text-sm font-medium bg-slate-200 rounded-lg shadow-sm opacity-0 tooltip dark:bg-slate-200 ${isTooltipVisible ? 'opacity-100' : ''}`}
                                        >
                                            Create Blog
                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 font-extrabold">
                                            <path stroke-linecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </div>
                                </Link>
                            </div>

                            <div className="relative ml-3 sm:pr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                                </svg>
                            </div>
                            {session ? (<div className="relative ml-3">
                                <div>
                                    <button type="button" id="dropdownToggleButton" data-dropdown-toggle="dropdownToggle"
                                        className={`relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2   ${menu ? "focus:ring-white focus:ring-offset-2" : "focus:ring-offset-gray-800"} `}
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                        onClick={() => setMenu(!menu)}>
                                        <span className="absolute -inset-1.5"></span>
                                        <span className="sr-only">Open user menu</span>
                                        {/* <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                                        <Avatar name={session.user?.name!} className="rounded-full" size="50" />
                                    </button>

                                </div>


                                {menu && (<div id="dropdownToggleButton" data-dropdown-toggle="dropdownToggle" className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                    <button
                                        onClick={() => router.push('/profile')}>
                                        <a id="dropdownToggleButton" className="block px-4 py-2 text-sm text-gray-700 font-semibold" role="menuitem" tabIndex={-1} id="user-menu-item-0">Your Profile</a>
                                    </button>
                                    <button
                                        onClick={logout}>
                                        <a id="dropdownToggleButton" className="block px-4 py-2 text-sm text-gray-700 font-semibold" role="menuitem" tabIndex={-1} id="user-menu-item-1">Sign Out</a>
                                    </button>
                                </div>)}
                            </div>) : (
                                <button
                                    onClick={() => router.push('/login')}
                                    className="bg-transparent  hover:bg-gray-500 text-black font-bold  hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded-lg">Login</button>
                            )}
                        </div>


                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-10 mb-8 bg-gray-300 ">
                <title>Blog App</title>
                <link rel="icon" href="favion.ico" />
            </div>
        </>
    );
}

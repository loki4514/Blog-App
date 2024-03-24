"use client";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { JwtPayload, jwtDecode } from "jwt-decode"
import Avatar from 'react-avatar';
import Link from 'next/link'
import Navbar from "./Navbar/page";
import Blog from "./blog/page";


export default function Home() {
    // interface User {
    //     id: string;
    //     email: string;
    //     name: string;
    //     iat: number;
    //     exp: number;
    // }
    // const [user, SetUser] = useState(false)
    // const [extUser, setExtUser] = useState<User | undefined>()
    // const [menu, setMenu] = useState(false)
    // const router = useRouter()

    // const toggleMenu = () => {
    //     setMenu(!menu)
    // }

    // useEffect(() => {
    //     const getUser = Cookies.get("token")
    //     if (getUser) {
    //         let decodedToken = jwtDecode(getUser);
    //         let somevar: User = JSON.parse(JSON.stringify(decodedToken));
    //         setExtUser(somevar);
    //         SetUser(true)
    //     }

    // }, [])

    // const logout = () => {
    //     Cookies.remove('token')
    //     router.push('/login')
    // }
    console.log("i have been summoned from home")
    return (
        <>
            {/* <Navbar></Navbar> */}
            <Blog></Blog>
        </>
    );
}

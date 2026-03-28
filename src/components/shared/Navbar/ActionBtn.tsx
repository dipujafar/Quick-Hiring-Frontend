"use client";
import Link from 'next/link'
import Cookies from "js-cookie";


export default function ActionBtn() {
    const isLoggedIn = Cookies.get("accessToken");
    console.log(isLoggedIn);
    console.log(isLoggedIn);
    return (
        <div>
            {isLoggedIn ? <Link href={"/admin"}> <button className="cursor-pointer text-white border-0 bg-primary-color hover:bg-primary/80 duration-200 px-5 py-3  font-bold">
                Dashboard
            </button>
            </Link> : <div className="lg:flex flex-row gap-x-4 lg:gap-x-5 items-center">
                <Link
                    href={"/admin"}
                    className=" font-bold text-primary-color hover:text-primary-color/60 duration-200"
                >
                    Login
                </Link>

                <div className="w-px bg-[#D6DDEB] h-8 hidden lg:block"></div>

                <Link href={"/admin"}> <button className="cursor-pointer text-white border-0 bg-primary-color hover:bg-primary/80 duration-200 px-5 py-3  font-bold">
                    Sign Up
                </button>
                </Link>
            </div>}
        </div>
    )
}

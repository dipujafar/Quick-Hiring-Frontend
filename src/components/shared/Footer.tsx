"use client";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "@/assets/images/logo-white.png"
import Link from "next/link";
import Container from "./Container";

export default function Footer() {
    return (
        <footer>
            <div className="bg-[#202430] pt-16 lg:pt-20 ">
                <Container className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5  md:flex-row ">
                        <div className="col-span-2">
                            <Link href={"/"}>
                                <Image src={logo} alt='logo' className='h-12 w-auto object-cover mb-10' placeholder='blur' blurDataURL={'/blurImage.jpg'} />
                            </Link>
                            <p className="mt-[18px] text-[15px] font-normal text-[#D6DDEB]">Great platform for the job seeker that passionate about startups. Find your dream job easier.</p>
                        </div>
                        <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                            <div className="">
                                <p className="text-white text-[18px] font-medium leading-normal">About</p>
                                <ul>
                                    <li className="mt-[15px]">
                                        <Link
                                            className="text-[#D6DDEB] hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold duration-150"
                                            href="/">Companies</Link>
                                    </li>

                                    <li className="mt-[15px]">
                                        <Link
                                            className="text-[#D6DDEB] hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold duration-150"
                                            href="#">Pricing</Link>
                                    </li>

                                    <li className="mt-[15px]">
                                        <Link
                                            className="text-[#D6DDEB] hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                                            href="#">Terms</Link>
                                    </li>

                                    <li className="mt-[15px]">
                                        <Link
                                            className="text-[#D6DDEB] hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                                            href="#">Advice</Link>
                                    </li>

                                    <li className="mt-[15px]">
                                        <Link
                                            className="text-[#D6DDEB] hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                                            href="#">Privacy</Link>
                                    </li>

                                </ul>
                            </div>

                            <div className="">
                                <p className="text-white text-[18px] font-medium leading-normal">Pages</p>
                                <ul>
                                    <li className="mt-[15px]">
                                        <Link
                                            className="text-[#D6DDEB] hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold duration-150"
                                            href="#">Help Docs</Link>
                                    </li>

                                    <li className="mt-[15px]">
                                        <Link
                                            className="text-[#D6DDEB] hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold duration-150"
                                            href="#">Guide</Link>
                                    </li>

                                    <li className="mt-[15px]">
                                        <Link
                                            className="text-[#D6DDEB] hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                                            href="/bikebuysell">Bikes Buy/sell</Link>
                                    </li>

                                    <li className="mt-[15px]">
                                        <Link
                                            className="text-[#D6DDEB] hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold"
                                            href="#">Updates</Link>
                                    </li>

                                    <li className="mt-[15px]">
                                        <Link
                                            className="text-[#D6DDEB] font-inter text-[15px] font-normal hover:font-semibold"
                                            href="#">Contact Us</Link>
                                    </li>

                                </ul>
                            </div>

                            <div className="mt-6 flex w-full flex-col justify-between text-white sm:flex-row md:mt-0">
                                <div className="mt-6 flex flex-col gap-4 sm:mt-0">
                                    <p className="text-deutziawhite font-inter text-[18px] font-medium">Get job notifications</p>
                                    <p className="text-sm text-[#D6DDEB]">The latest job news, articles, sent to your inbox weekly.</p>
                                    <div className="flex flex-row flex-wrap gap-1 items-center">
                                        <input type="email" className="px-3 py-2.5  bg-white text-primary-gray border-0 outline-0 focus:outline-0" placeholder="Email address" />
                                        <button className='cursor-pointer text-white border-0 bg-primary-color px-5 py-3  font-semibold text-sm'>
                                            Subscribe
                                        </button>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-20 py-8 flex flex-row justify-between items-center">
                        <p className=" text-sm font-normal text-gray-400">{new Date().getFullYear()} @ QuickHire. All right reserved.</p>


                        <div className="flex gap-4">

                            <Link className="hover:bg-slate-50 duration-150 bg-white/10 text-white hover:text-black p-2.5 rounded-full" target="_blank"
                                href="#">
                                <FaFacebookF size={15} />
                            </Link>
                            <Link
                                className="hover:bg-slate-50 duration-150 bg-white/10 text-white hover:text-black p-2.5 rounded-full" target="_blank"
                                href="/">
                                <FaTwitter size={15} />
                            </Link>
                            <Link
                                className="hover:bg-slate-50 duration-150 bg-white/10 text-white hover:text-black p-2.5 rounded-full" target="_blank"
                                href="/">
                                <FaInstagram size={15} />
                            </Link>

                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    );
}
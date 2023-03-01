import React from 'react'
import Link from 'next/link'
import { FaFacebookF } from 'react-icons/fa';
import { TiSocialTwitter, TiSocialLinkedin, TiSocialInstagram } from 'react-icons/ti';

const Footer = () => {
    return (
        <div>
            <footer className="text-gray-600 body-font ">
                <div className="container px-5 md:py-24 py-18 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <Link href={"/"}><img className='m-auto h-12 w-30' src="/logo.png" alt="CodesWear" /></Link>
                        <p className="mt-2 text-sm text-gray-500 px-6">CodesWear -Wear The &lt;code&gt; premium coding tshirts and hoodies and apperalas</p>
                    </div>
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10  text-center">
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SHOP</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <Link href={"/category/tshirts"} className="text-gray-600 hover:text-black">Tshirts</Link>
                                </li>
                                <li>
                                    <Link href={"/category/hoodies"} className="text-gray-600 hover:text-black">  Hoodies</Link>
                                </li>
                                <li>
                                    <Link href={"/category/stickers"} className="text-gray-600 hover:text-black">Stickers</Link>
                                </li>
                                <li>
                                    <Link href={"/category/mugs"} className="text-gray-600 hover:text-black">  Mugs</Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">POLICY</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800">First Link</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800">Second Link</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800">Third Link</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">HELP</h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800">First Link</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800">Second Link</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800">Third Link</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">ABOUT</h2>
                            <nav className="list-none mb-10 ">
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800">First Link</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800">Second Link</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800">Third Link</a>
                                </li>
                                <li>
                                    <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-gray-500 text-sm text-center sm:text-left">© 2020 CodesWear — Al Rights Reserved

                        </p>
                        <span className=" justify-end inline-flex sm:ml-auto sm:mt-0 mt-2 sm:justify-start ">
                            <a className="text-gray-500">
                                <FaFacebookF />
                            </a>
                            <a className="ml-4 text-gray-500">
                                <TiSocialLinkedin />
                            </a>
                            <a className="ml-4 text-gray-500">
                                <TiSocialInstagram />
                            </a>
                            <a className="ml-4 text-gray-500">
                                <TiSocialTwitter />
                            </a>
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer

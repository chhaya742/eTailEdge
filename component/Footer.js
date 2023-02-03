import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF } from 'react-icons/Fa';
import { TiSocialTwitter, TiSocialLinkedin, TiSocialInstagram } from 'react-icons/Ti';

const Footer = () => {
        return (
            <div>
                <footer className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">

                        <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
                            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                                <Link href={"/"}>
                                    <Image src="/logo.png" alt="" height={200} width={200} />
                                </Link>

                                <p className="mt-2 text-sm text-gray-500">Air plant banjo lyft occupy retro adaptogen indego</p>
                            </div>
                            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                                <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
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
                                <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
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
                                <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
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
                                <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CATEGORIES</h2>
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
                        </div>
                    </div>
                    <div className="bg-gray-100">
                        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                            <p className="text-gray-500 text-sm text-center sm:text-left">© 2020 Tailblocks —
                                <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@knyttneve</a>
                            </p>
                            <span className=" sm:ml-auto sm:mt-0 mt-2 flex justify-end">
                                <a className="text-gray-500">
                                    <FaFacebookF />
                                </a>
                                <a className="ml-3 text-gray-500">
                                    <TiSocialTwitter />
                                </a>
                                <a className="ml-3 text-gray-500">
                                    <TiSocialInstagram />
                                </a>
                                <a className="ml-3 text-gray-500">
                                    <TiSocialLinkedin />
                                </a>
                            </span>
                        </div>
                    </div>

                </footer>
            </div>
        )
    }
    export default Footer

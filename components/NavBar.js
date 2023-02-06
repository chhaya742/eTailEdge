import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/Ai'
const NavBar = () => {
    const ref = useRef()
    const toggleCart = () => {
        if (ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-full")
            ref.current.classList.add("translate-x-0")

        } else {
            ref.current.classList.add("translate-x-full")
            ref.current.classList.remove("translate-x-0")
        }
    }

    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md'>
            <div className='logo mx-5'>
                <Link href={"/"}> <Image src="/logo.png" alt="" width={200} height={40} /></Link>

            </div>
            <div className='nav'>
                <ul className='flex items-center space-x-5 font-bold md:text-base'>
                    <Link href={"/tshirts"}><li >Tshirts</li></Link>
                    <Link href={"/hoodies"}><li >Hoodies</li></Link>
                    <Link href={"/stickers"}><li>Stickers</li></Link>
                    <Link href={"/mugs"}><li>Mugs</li></Link>
                </ul>
            </div>
            <div onClick={toggleCart} className='cart absolute right-0 top-4 mx-5'>
                <AiOutlineShoppingCart className='text-xl md:text-2xl cursor-pointer' />
            </div>
            <div ref={ref} className="sideCart w-72 h-full absolute top-0 right-0 bg-pink-200 px-2 py-10 transform transition-transform translate-x-full " >
                <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                <span onClick={toggleCart} className='absolute top-4 right-2 cursor-pointer text-2xl text-pink-500'><AiFillCloseCircle /></span>
                <ol className=' font-semibold' >
                    <li>
                        <div className="item flex my-5">
                            <div className='w-2/3 font-semibold'> Tshirttshirt tshirt tshirt tshirt tshirt ts</div>
                            <div className='flex justify-center items-center w-1/3' ><AiFillMinusCircle className='cursor-pointer text-base text-pink-500' /><span className='mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-base text-pink-500' /></div>
                        </div>
                    </li>
                    <li>
                        <div className="item flex my-5">
                            <div className='w-2/3 font-semibold'> Tshirttshirt tshirt tshirt tshirt tshirt ts</div>
                            <div className='flex justify-center items-center w-1/3' ><AiFillMinusCircle className='cursor-pointer text-base text-pink-500' /><span className='mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-base text-pink-500' /></div>
                        </div>
                    </li>
                    <li>
                        <div className="item flex my-5">
                            <div className='w-2/3 font-semibold'> Tshirttshirt tshirt tshirt tshirt tshirt ts</div>
                            <div className='flex justify-center items-center w-1/3' ><AiFillMinusCircle className='cursor-pointer text-base text-pink-500' /><span className='mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-base text-pink-500' /></div>
                        </div>
                    </li>
                    <li>
                        <div className="item flex my-5">
                            <div className='w-2/3 font-semibold'> Tshirttshirt tshirt tshirt tshirt tshirt ts</div>
                            <div className='flex justify-center items-center w-1/3' ><AiFillMinusCircle className='cursor-pointer text-base text-pink-500' /><span className='mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-base text-pink-500' /></div>
                        </div>
                    </li>
                    <li>
                        <div className="item flex my-5">
                            <div className='w-2/3 font-semibold'> Tshirttshirt tshirt tshirt </div>
                            <div className='flex justify-center items-center w-1/3' ><AiFillMinusCircle className='cursor-pointer text-base text-pink-500' /><span className='mx-2'>1</span><AiFillPlusCircle className='cursor-pointer text-base text-pink-500' /></div>
                        </div>
                    </li>
                </ol>
                <button className="flex mx-auto mt-16 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">checkout</button>
            </div>
        </div>
    )
}

export default NavBar
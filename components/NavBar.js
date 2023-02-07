import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/Ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
const NavBar = ({ cart, addToCart, removeCart, clearCart, subtl }) => {
    // console.log(cart)
    const [toggle, settoggle] = useState(false)
    const toggleCart = () => {
        settoggle(true)
    }

    const handleClick = () => {
        settoggle(false)
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
            {toggle && <div className="w-72 h-34 sideCart absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform " >
                <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                <span className='absolute top-5 right-2 cursor-pointer text-2xl text-pink-500'><AiFillCloseCircle onClick={handleClick} /></span>
                <ol className='list-decimal font-semibold' >
                    {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'> Your cart is empty !</div>}

                    {Object.keys(cart).map((item) => {
                        return <li key={item}>
                            <div className="item flex my-5">
                                <div className='w-2/3 font-semibold'> {cart[item].name}</div>
                                <div className='flex font-semibold items-center justify-center w-1/3' ><AiFillMinusCircle onClick={() => removeCart(item, 1, cart[item].price, cart[item].size, cart[item].name, cart[item].variant)} className='cursor-pointer text-base text-pink-500' /><span className='mx-2 text-sm'>{cart[item].qyt}</span><AiFillPlusCircle onClick={() => addToCart(item, 1, cart[item].price, cart[item].size, cart[item].name, cart[item].variant)} className='cursor-pointer te xt-base text-pink-500' /></div>
                            </div>
                        </li>
                    })}
                </ol>
                <div className="flex mt-10 ">
                    <button className="flex mx-auto  text-white bg-pink-500 border-0 pr-2 py-1 focus:outline-none hover:bg-pink-600 rounded text-sm"> <BsFillBagCheckFill className='m-1' />checkout</button>
                    <button onClick={clearCart} className="flex mx-auto px-2 text-white bg-pink-500 border-0 pr-2 py-1 focus:outline-none hover:bg-pink-600 rounded text-sm"> Clear Cart</button>
                </div>
            </div>}

        </div>
    )
}

export default NavBar
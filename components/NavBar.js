import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle, AiOutlineLogout } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle, MdManageAccounts, MdHelp } from 'react-icons/md'
import { FcAbout } from 'react-icons/fc'
import jwt from "jsonwebtoken"
const NavBar = ({ logout, user, cart, addToCart, removeCart, clearCart, subtl }) => {
    const [dropDown, setDropDown] = useState(false)
    const [toggle, settoggle] = useState(false)
const [name, setName] = useState('')
    const toggleCart = () => {
        settoggle(true)
    }
    const handleClick = () => {
        settoggle(false)
    }
    useEffect(() => {
        if(localStorage.getItem("token")){
            setName(jwt.decode(localStorage.getItem("token"), { complete: true }).payload.user.name)
        }
    }, [])
    
    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 z-10 bg-white'>
            <div className='logo flex items-center' >
                <div className='mx-2'>
                    {dropDown &&
                        <div onMouseOver={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)} className='absolute right-9 top-10 shadow-lg bg-pink-200 px-5 py-1 rounded-md w-60 h-60'>
                            <ul >
                                <Link href={"/myaccount"}><li className='py-1 hover:text-white  text-base flex '><MdManageAccounts className='py-1 mx-4 text-3xl' /><span className='font-semibold underline'> {name}</span></li></Link>

                                <Link href={"/orders"}><li className='py-1 hover:text-white text-lg flex'><BsFillBagCheckFill className='py-1 mx-4  text-3xl' />Orders</li></Link>
                                <hr />
                                <Link href={"/about"}><li className='py-1 hover:text-white text-lg flex'><FcAbout className='py-1 mx-4 text-black text-3xl' />About</li></Link>

                                <Link href={"/help"}><li className='py-1 hover:text-white text-lg flex'><MdHelp className='py-1 mx-4  text-3xl' />Help</li></Link>

                            </ul>
                            <div onClick={logout} className='py-1 absolute bottom-2 hover:text-white text-lg flex' ><AiOutlineLogout className='py-1 mx-1  text-3xl' />logout</div>
                        </div>}
                    {user.value && <MdAccountCircle onMouseOver={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)} className='absolute right-16 top-4 text-xl md:text-2xl cursor-pointer' />}
                    {!user.value && <Link href={"/login"}>
                        <button className='bg-pink-600 px-1 py-1 rounded-md absolute right-16 top-1 text-xl md:text-xl cursor-pointer'>login</button>
                    </Link>}
                </div>
                <Link href={"/"} className="mr-1"> <img src="/logo.png" alt="" className="w-40 h-15" /></Link>
            </div>
            <div className='nav'>
                <ul className='flex items-center space-x-5 font-bold md:text-base'>
                    <Link href={"/category/tshirts"}><li className=" hover:text-pink-500">Tshirts</li></Link>
                    <Link href={"/category/hoodies"}><li className=" hover:text-pink-500">Hoodies</li></Link>
                    <Link href={"/category/stickers"}><li className=" hover:text-pink-500">Stickers</li></Link>
                    <Link href={"/category/mugs"}><li className=" hover:text-pink-500">Mugs</li></Link>
                    <Link href={"/category/gift"}><li className=" hover:text-pink-500">Gift</li></Link>
                </ul>
            </div>
            <div onClick={toggleCart} className='cart mx-5 absolute top-4 right-0'>
                <AiOutlineShoppingCart className='text-xl md:text-2xl cursor-pointer' />
            </div>
            {toggle && <div className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform`} >
                <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
                <span className='absolute top-5 right-2 cursor-pointer text-2xl text-pink-500'><AiFillCloseCircle onClick={handleClick} /></span>
                <ol className='list-decimal font-semibold' >
                
                    {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'> Your cart is empty !</div>}
                    {Object.keys(cart).map((item) => {
                        return <li key={item}>
                            <div className="item flex my-5">
                                <div className='w-2/3 font-semibold'> {cart[item].name}</div>
                                <div className='flex font-semibold items-center justify-center w-1/3' ><AiFillMinusCircle onClick={() => removeCart(item, 1, cart[item].price, cart[item].size, cart[item].name, cart[item].variant)} className='cursor-pointer text-base text-pink-500' /><span className='mx-2 text-sm'>{cart[item].qyt}</span><AiFillPlusCircle onClick={() => addToCart(item, cart[item].id, 1, cart[item].price, cart[item].size, cart[item].name, cart[item].variant)} className='cursor-pointer te xt-base text-pink-500' /></div>
                            </div>
                        </li>
                    })}
                </ol>
                <div className="total font-bold">Subtotal: ₹{subtl}</div>
                <div className="flex mt-5 ">

                    <Link href={localStorage.getItem("token") ? "/checkout" : "/login"}> <button disabled={subtl > 0 ? false : true} className="flex mx-auto  text-white bg-pink-500 border-0 pr-2 py-1 focus:outline-none hover:bg-pink-600 rounded text-sm disabled:bg-pink-300"> <BsFillBagCheckFill className='m-1' />checkout</button></Link>

                    <button disabled={subtl > 0 ? false : true} onClick={clearCart} className="flex mx-auto px-2 text-white bg-pink-500 border-0 pr-2 py-1 focus:outline-none hover:bg-pink-600 rounded text-sm disabled:bg-pink-300"> Clear Cart</button>
                </div>
            </div>}
        </div>
    )
}

export default NavBar
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle, AiOutlineLogout } from 'react-icons/ai'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle, MdManageAccounts, MdHelp } from 'react-icons/md'
import { FcAbout } from 'react-icons/fc'
import { HiMenuAlt3 } from 'react-icons/hi'
import jwt from "jsonwebtoken"

const NavBar = ({ logout, user, cart, addToCart, removeCart, clearCart, subtl }) => {
    const router = useRouter();
    const [dropDown, setDropDown] = useState(false)
    const [toggle, settoggle] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    const [userDetails, setUserDetails] = useState({ name: "", email: "" });

    const toggleCart = () => {
        settoggle(true);
        setMobileMenu(false);
    };

    const handleClick = () => {
        settoggle(false);
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            const decoded = jwt.decode(localStorage.getItem("token"), { complete: true });
            console.log(decoded);

            setUserDetails({
                name: decoded?.payload?.name || "",
                email: decoded?.payload?.email || ""
            });
        }
        let path = ['/checkout', '/order', '/orders'];
        if (path.includes(router.pathname)) {
            setDropDown(false);
        }
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenu(false);
    }, [router.pathname]);

    const cartCount = Object.keys(cart).reduce((acc, key) => acc + (cart[key].qyt || 0), 0);

    const navLinks = [
        { href: "/category/tshirts", label: "Tshirts" },
        { href: "/category/hoodies", label: "Hoodies" },
        { href: "/category/stickers", label: "Stickers" },
        { href: "/category/mugs", label: "Mugs" },
        { href: "/category/gift", label: "Gift" },
    ];

    return (
        <>
            <div className='sticky top-0 z-50 bg-white border-b shadow-sm'>
                <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>

                    {/* Logo */}
                    <Link href="/" className="mr-1 flex-shrink-0">
                        <img src="/logo.png" alt="logo" className="w-40 h-auto" />
                    </Link>

                    {/* Desktop Nav Links */}
                    <ul className='hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider'>
                        {navLinks.map(({ href, label }) => (
                            <Link href={href} key={label}>
                                <li className={`cursor-pointer pb-0.5 border-b-2 transition-colors duration-200 ${router.pathname === href
                                    ? 'border-pink-500 text-pink-500'
                                    : 'border-transparent hover:text-pink-500 hover:border-pink-300'
                                    }`}>
                                    {label}
                                </li>
                            </Link>
                        ))}
                    </ul>

                    {/* Right Controls */}
                    <div className='flex items-center gap-4'>

                        {/* Account icon / Login */}
                        <div className='relative'>
                            {user.value ? (
                                <MdAccountCircle
                                    onMouseOver={() => setDropDown(true)}
                                    onMouseLeave={() => setDropDown(false)}
                                    className='text-3xl cursor-pointer hover:text-pink-500 transition-colors duration-200'
                                />
                            ) : (
                                <Link href="/login">
                                    <span className='text-sm font-medium px-3 py-1.5 rounded-full border border-pink-400 text-pink-500 hover:bg-pink-50 transition-colors duration-200'>
                                        Login
                                    </span>
                                </Link>
                            )}

                            {/* Account Dropdown */}
                            {dropDown && (
                                <div
                                    onMouseOver={() => setDropDown(true)}
                                    onMouseLeave={() => setDropDown(false)}
                                    className='absolute right-0 top-10 shadow-xl bg-white border border-pink-100 rounded-xl w-64 py-3 z-50 overflow-hidden'
                                >
                                    {/* User Info Header */}
                                    <div className='px-4 pb-3 mb-1 border-b border-pink-100'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center'>
                                                <MdManageAccounts className='text-pink-500 text-2xl' />
                                            </div>
                                            <div className='overflow-hidden'>
                                                <Link href="/myaccount">
                                                    <p className='font-semibold text-sm text-gray-800 hover:text-pink-500 truncate transition-colors'>{userDetails.name}</p>
                                                </Link>
                                                <p className='text-xs text-gray-400 truncate'>{userDetails.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <ul className='px-2'>
                                        <Link href="/orders">
                                            <li className='flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-colors cursor-pointer'>
                                                <BsFillBagCheckFill className='text-lg text-pink-400 flex-shrink-0' />
                                                My Orders
                                            </li>
                                        </Link>
                                        <Link href="/about">
                                            <li className='flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-colors cursor-pointer'>
                                                <FcAbout className='text-lg flex-shrink-0' />
                                                About
                                            </li>
                                        </Link>
                                        <Link href="/help">
                                            <li className='flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-colors cursor-pointer'>
                                                <MdHelp className='text-lg text-pink-400 flex-shrink-0' />
                                                Help
                                            </li>
                                        </Link>
                                    </ul>

                                    <div className='mx-2 mt-1 pt-2 border-t border-pink-100'>
                                        <div
                                            onClick={logout}
                                            className='flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer'
                                        >
                                            <AiOutlineLogout className='text-lg flex-shrink-0' />
                                            Logout
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Cart Icon with Badge */}
                        <div className='relative'>
                            <AiOutlineShoppingCart
                                onClick={toggleCart}
                                className='text-3xl cursor-pointer hover:text-pink-500 transition-colors duration-200'
                            />
                            {cartCount > 0 && (
                                <span className='absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full leading-none px-1'>
                                    {cartCount}
                                </span>
                            )}
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            className='md:hidden text-2xl text-gray-700 hover:text-pink-500 transition-colors'
                            onClick={() => setMobileMenu(prev => !prev)}
                            aria-label="Toggle menu"
                        >
                            <HiMenuAlt3 />
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenu && (
                    <div className='md:hidden bg-white border-t border-pink-100 px-4 py-3'>
                        <ul className='flex flex-col gap-1'>
                            {navLinks.map(({ href, label }) => (
                                <Link href={href} key={label}>
                                    <li
                                        className={`px-3 py-2.5 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors cursor-pointer ${router.pathname === href
                                            ? 'bg-pink-50 text-pink-500'
                                            : 'text-gray-700 hover:bg-pink-50 hover:text-pink-500'
                                            }`}
                                    >
                                        {label}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Cart Sidebar Backdrop */}
            {toggle && (
                <div
                    className='fixed inset-0 bg-black/30 z-40 backdrop-blur-sm transition-opacity duration-300'
                    onClick={handleClick}
                />
            )}

            {/* Cart Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${toggle ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Cart Header */}
                <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
                    <div className='flex items-center gap-2'>
                        <AiOutlineShoppingCart className='text-xl text-pink-500' />
                        <h2 className='font-bold text-lg'>Shopping Cart</h2>
                        {cartCount > 0 && (
                            <span className='bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-0.5 rounded-full'>
                                {cartCount}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleClick}
                        className='text-gray-400 hover:text-pink-500 transition-colors'
                        aria-label="Close cart"
                    >
                        <AiFillCloseCircle className='text-2xl' />
                    </button>
                </div>

                {/* Cart Items */}
                <div className='flex-1 overflow-y-auto px-6 py-4'>
                    {Object.keys(cart).length === 0 || localStorage.getItem("cart") === null ? (
                        <div className='flex flex-col items-center justify-center h-full gap-3 text-gray-400'>
                            <AiOutlineShoppingCart className='text-5xl' />
                            <p className='font-medium text-sm'>Your cart is empty</p>
                            <button
                                onClick={handleClick}
                                className='text-sm text-pink-500 underline underline-offset-2 hover:text-pink-600'
                            >
                                Continue shopping
                            </button>
                        </div>
                    ) : (
                        <ol className='flex flex-col gap-4'>
                            {localStorage.getItem("cart") !== null && Object.keys(cart).map((item) => (
                                <li key={item} className='flex items-center gap-3 py-3 border-b border-gray-50'>
                                    {/* Item Info */}
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-sm font-semibold text-gray-800 truncate'>{cart[item].name}</p>
                                        {cart[item].size && (
                                            <p className='text-xs text-gray-400 mt-0.5'>Size: {cart[item].size}</p>
                                        )}
                                        <p className='text-xs text-pink-500 font-medium mt-0.5'>₹{cart[item].price}</p>
                                    </div>
                                    {/* Quantity Controls */}
                                    <div className='flex items-center gap-2 flex-shrink-0'>
                                        <button
                                            onClick={() => removeCart(item, 1, cart[item].price, cart[item].size, cart[item].name, cart[item].variant)}
                                            className='text-pink-400 hover:text-pink-600 transition-colors'
                                            aria-label="Decrease quantity"
                                        >
                                            <AiFillMinusCircle className='text-xl' />
                                        </button>
                                        <span className='text-sm font-semibold w-5 text-center'>{cart[item].qyt}</span>
                                        <button
                                            onClick={() => addToCart(item, cart[item].id, 1, cart[item].price, cart[item].size, cart[item].name, cart[item].variant)}
                                            className='text-pink-400 hover:text-pink-600 transition-colors'
                                            aria-label="Increase quantity"
                                        >
                                            <AiFillPlusCircle className='text-xl' />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>

                {/* Cart Footer */}
                <div className='px-6 py-5 border-t border-gray-100 bg-gray-50'>
                    <div className='flex justify-between items-center mb-4'>
                        <span className='text-sm text-gray-500'>Subtotal</span>
                        {/* <span className='font-bold text-lg text-gray-800'>
                            ₹{localStorage.getItem("cart") !== null ? subtl : 0}
                        </span> */}
                        <span className='font-bold text-lg text-gray-800'>
                            ₹{subtl}
                        </span>
                    </div>
                    <div className='flex gap-3'>
                        {/* <Link
                            href={localStorage.getItem("token") ? "/checkout" : "/login"}
                            className='flex-1'
                        > */}
                        <Link
                            href={user?.value ? "/checkout" : "/login"}
                            className='flex-1'
                        >
                            <button
                                disabled={subtl <= 0}
                                className='w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-200 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition-colors duration-200'
                            >
                                <BsFillBagCheckFill />
                                Checkout
                            </button>
                        </Link>
                        <button
                            disabled={subtl <= 0}
                            onClick={clearCart}
                            className='px-4 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors duration-200'
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar

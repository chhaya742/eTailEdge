import React from 'react'
import Link from 'next/link'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

const Checkout = ({ cart, clearCart, addToCart, removeCart, subtl }) => {
  return (
    <div className='container px-2 mx-auto '>
      <h1 className='font-bold text-xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex my-1 md:my-4">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="px-2 w-full ">
        <div className=" mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea id="address" rows="2" cols="30" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">
          </textarea>
        </div>
      </div>
      <div className="mx-auto flex my-1 md:my-4">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-1 md:my-4">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="pin" className="leading-7 text-sm text-gray-600">Pin Code</label>
            <input type="pin" id="pin" name="pin" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>
      <h2 className='font-semibold text-xl'>2. Review Cart Item</h2>
      {<div className=" sideCart  bg-pink-100 p-6 m-2" >

        <ol className='list-decimal font-semibold' >
          {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'> Your cart is empty !</div>}
          {Object.keys(cart).map((item) => {
            return <li key={item}>
              <div className="item flex my-5">
                <div className='font-semibold'> {cart[item].name}</div>
                <div className='flex font-semibold items-center justify-center w-1/3' ><AiFillMinusCircle onClick={() => removeCart(item, 1, cart[item].price, cart[item].size, cart[item].name, cart[item].variant)} className='cursor-pointer text-base text-pink-500' /><span className='mx-2 text-sm'>{cart[item].qyt}</span><AiFillPlusCircle onClick={() => addToCart(item, 1, cart[item].price, cart[item].size, cart[item].name, cart[item].variant)} className='cursor-pointer te xt-base text-pink-500' /></div>
              </div>
            </li>
          })}

        </ol>
        <div className="total font-bold">Subtotal: ₹{subtl}</div>
      </div>}
      <div className="flex mt-5 px-2 ">
        <Link href={"/"}> <button className="flex mx-auto text-white bg-pink-500 border-0 pr-2 py-1 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm m-1">pay ₹{subtl}</button>
        </Link>
      </div>
    </div>
  )
}

export default Checkout
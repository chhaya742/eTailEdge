import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
const Checkout = ({ cart, clearCart, addToCart, removeCart, subtl }) => {
  const [id, setId] = useState(1)
  const router = useRouter()
  const [userid, setUserid] = useState(id)
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [address, setaddress] = useState("")
  const [state, setstate] = useState("")
  const [phone, setphone] = useState("")
  const [city, setcity] = useState("")
  const [pin, setpin] = useState("")
  let pId = (Object.values(cart).length !== 0 ? Object.values(cart)[0].id : "");

  const [userDetails, setUserDetails] = useState({ userid: "", name: name, email: email, address: address, phone: phone, state: state, city: city, pin: pin, productid: "", amount: "" })
  const [error, setError] = useState({ isError: true })
  const [pay, setPay] = useState(true)


  const request = async (userDetails) => {
    const token = localStorage.getItem('token');
    var decodedToken = jwt.decode(token, { complete: true });
    userDetails.userid=parseInt(decodedToken.payload.user.id)
    userDetails.productid=pId
    userDetails.amount=subtl
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_localhost}/api/order/order`, userDetails)
    if (data.status) {
      toast.success(data.data.message)
      if (localStorage.getItem("token")) {
        setTimeout(() => {
          router.push(`/order?id=${data.data[0].orderId}`)
        }, 1000);
      }
    } else {
      toast.error(data.data.message)
    }
  }

  useEffect(() => {
    if (!error.isError) {
      setPay(false)
      request(userDetails);
    }
  }, [error])

  const handleInput = async (e) => {
    const { name, value } = e
    setUserDetails({ ...userDetails, [name]: value })
    if (e.name === 'name') {
      setname(e.value)

    }
    else if (e.name === 'email') {
      setemail(e.value)
    }
    else if (e.name === 'address') {
      setaddress(e.value)
    }

    else if (e.name === 'phone') {
      setphone(e.value)
    }
    else if (e.name === 'pin') {
      setpin(e.value)
      if (e.value.length == 6) {
        let data = await fetch(`${process.env.NEXT_PUBLIC_localhost}/api/pincode`)
        data = await data.json();
        if (Object.keys(data).includes((e.value))) {
          setstate(data[e.value][1])
          setcity(data[e.value][0])
        } else {
          setstate('')
          setcity('')

        }
      } else {
        setstate('')
        setcity('')
      }
    }

  }
  const hamdleError = (userDetails) => {
    const { name, email, address, phone, state, city, pin } = userDetails
    const error = {};
    let isError = false;
    if (!name) {
      error.name = "name is requiered";
      isError = true;

    }
    if (!email) {
      error.email = "email is requiered";
      isError = true;

    }
    if (!address) {
      error.address = "address is requiered";
      isError = true;

    }
    if (!phone) {
      error.phone = "phone is requiered";
      isError = true;

    }
    // if (!state) {
    //   error.state = "state is requiered";
    //   isError = true;

    // }
    if (!pin) {
      error.pin = "pincode is requiered";
      isError = true;

    }
    // if (!city) {
    //   error.city = "city is requiered";
    //   isError = true;

    // }
    error.isError = isError;
    return error


  }

  const handleSubmit = () => {

    const error = hamdleError(userDetails);
    setError(error)
  }

  return (
    <div className='container px-2 mx-auto '>
      <h1 className='font- text-xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semi text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex my-1 md:my-4">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="name" id="name" name="name" onChange={(e) => handleInput(e.target)} value={name} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            {error.name && <div style={{ color: "red" }}>{error.name}</div>}
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" onChange={(e) => handleInput(e.target)} value={email} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            {error.email && <div style={{ color: "red" }}>{error.email}</div>}
          </div>
        </div>
      </div>
      <div className="px-2 w-full ">
        <div className=" mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea id="address" rows="2" cols="30" name="address" onChange={(e) => handleInput(e.target)} type="text" value={address} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">
          </textarea>
          {error.address && <div style={{ color: "red" }}>{error.address}</div>}
        </div>
      </div>
      <div className="mx-auto flex my-1 md:my-4">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" id="phone" name="phone" onChange={(e) => handleInput(e.target)} value={phone} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            {error.phone && <div style={{ color: "red" }}>{error.phone}</div>}
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="pin" className="leading-7 text-sm text-gray-600">Pin Code</label>
            <input type="pin" id="pin" name="pin" onChange={(e) => handleInput(e.target)} value={pin} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            {error.pin && <div style={{ color: "red" }}>{error.pin}</div>}
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-1 md:my-4">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" onChange={(e) => handleInput(e.target)} value={city} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            { /*{error.city && <div style={{ color: "red" }}>{error.city}</div>}*/}
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" onChange={(e) => handleInput(e.target)} value={state} className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            {/*{error.state && <div style={{ color: "red" }}>{error.state}</div>}*/}
          </div>
        </div>
      </div>
      <h2 className='font-semi text-xl'>2. Review Cart Item</h2>
      {<div className=" sideCart  bg-pink-100 p-6 m-2" >
        <ol className='list-decimal font-semi' >
          {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'> Your cart is empty !</div>}
          {Object.keys(cart).map((item) => {
            return <li key={item}>
              <div className="item flex my-5">
                <div className='font-semibold'> {cart[item].name}</div>
                <div className='flex font-semibold items-center justify-center w-1/3' ><AiFillMinusCircle onClick={() => removeCart(item, 1, cart[item].price, cart[item].size, cart[item].name, cart[item].variant)} className='cursor-pointer text-base text-pink-500' /><span className='mx-2 text-sm'>{cart[item].qyt}</span><AiFillPlusCircle onClick={() => addToCart(item, cart[item].id, 1, cart[item].price, cart[item].size, cart[item].name, cart[item].variant)} className='cursor-pointer te xt-base text-pink-500' /></div>
              </div>
            </li>
          })}

        </ol>
        <div className="total font-bold">Subtotal: ₹{subtl}</div>
      </div>}
      <div className="flex mt-5 px-2 absolute ">
        <button disabled={Object.keys(cart).length > 0 ? false : true} onClick={handleSubmit} className="flex mx-auto disabled:bg-pink-300 text-white bg-pink-500 border-0 pr-2 py-1 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm m-1">pay ₹{subtl}</button>
      </div>
      {Object.keys(cart).length > 0 ? "" : <div className='text-red-500 underline mx-2'><Link href={"/category/tshirts"}>please add product in cart</Link></div>}
    </div>
  )
}

export default Checkout
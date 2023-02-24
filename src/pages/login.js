import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
const Login = () => {
  const router = useRouter()
  const [user, setUser] = useState({ email: "", password: "" })
  const [error, setError] = useState({ isError: true })

  const request = async () => {
    const data = await axios.post(`${process.env.NEXT_PUBLIC_localhost}/api/authentication/login`, user)
    if (data.data.status) {
      localStorage.setItem("token", data.data.data[0].token)
      localStorage.setItem("user", JSON.stringify({ "id": data.data.data[0].id, "email": data.data.data[0].email, "name": data.data.data[0].name }))
      toast.success("You have loged in successfully")
      setTimeout(() => {
        router.push("/")
      }, 1000);
    } else {
      toast.error(data.data.message)
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/")
    }
    if (!error.isError) {
      request(user);
    }
  }, [error])

  const handleInput = (e) => {
    const { name, value } = e
    setUser({ ...user, [name]: value })
  }

  const hamdleError = (user) => {
    const { email, password } = user
    const error = {};
    let isError = false;
    if (!email) {
      error.email = "email is requiered";
      isError = true;

    }
    if (!password) {
      error.password = "password is requiered";
      isError = true;

    }
    error.isError = isError;
    return error


  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = hamdleError(user);
    setError(error)

  }
  return (
    <div>
      <div className="container px-4 max-w-6xl mx-auto my-8">
        <div className="w-full max-w-xl mx-auto">
          <form className="LgnForm max-w-lg mx-auto  shadow-lg bg-white rounded-lg pt-6 pb-8 mb-4 px-8">
            <img className="w-14 h-14 mx-auto" src="/images-modified.png" />
            <div className="MskForm">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  email
                </label>
                <input onChange={(e) => handleInput(e.target)} value={user.email} name="email" className="shadow apperance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" />
                {error.email && <div style={{ color: "red" }}>{error.email}</div>}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  password
                </label>
                <input onChange={(e) => handleInput(e.target)} value={user.password} name="password" className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                <p className="text-red-500 text-xs italic">Please choose a password.</p>
                {error.password && <div style={{ color: "red" }}>{error.password}</div>}
              </div>
              <div className="flex items-center justify-between">
                <button onClick={(e) => handleSubmit(e)} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Sign In
                </button>
                <Link href="/forgot-password" className="inline-block align-baseline font-bold text-sm text-pink-500 hover:text-blue-800"> Forgot Password?</Link>
              </div>
              <p className="mt-2 text-black-500 text-xs text-center"> Do not have an account, <a href={"/signup"} className="text-black-700 font-bold">Create an Account</a> now.
              </p>
              <div className=" text-center px-12 ">
                <h2 className="underline my-3 font-bold">Login With Social Media</h2>
                <Link href={"/"} className="LgnFb p-2 block bg-blue-700 rounded-sm text-white md:hover:text-black-600 my-3">
                  <button>  Sign up with Facebook</button>
                </Link>
                <Link href={"/"} className="LgnFb p-2 block bg-red-700 rounded-sm text-white md:hover:text-black-600 my-3">
                  <button> Sign up with Gmail </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
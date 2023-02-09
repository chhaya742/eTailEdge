import React from 'react'
import Link from 'next/link'
const Login = () => {
  return (
    <div>
      <div className="container px-4 max-w-6xl mx-auto my-8">
        <div className="w-full max-w-xl mx-auto">
          <form className="LgnForm max-w-lg mx-auto  shadow-lg bg-white rounded-lg pt-6 pb-8 mb-4 px-8">
            <img className="w-14 h-14 mx-auto" src="/images-modified.png" />
            <div className="MskForm">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input className="shadow apperance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  password
                </label>
                <input className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                <p className="text-red-500 text-xs italic">Please choose a password.</p>
              </div>

              <div className="flex items-center justify-between">
                <Link href={"/"}>
                  <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Sign In
                  </button>
                </Link>
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
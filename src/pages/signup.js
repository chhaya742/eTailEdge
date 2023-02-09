import React from 'react'
import Link from "next/link"
const Signup = () => {
  return (
    <div>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2 py-5">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white pt-4">
            <img className="w-8 h-8 mr-2" src="/images-modified.png" alt="logo" />
            CodesWear
          </a>
          <div className="w-full my-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">

            <h1 className="mb-4 text-2xl text-center">Sign up</h1>
            <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="fullname" placeholder="Full Name" />
            <input type="text" className="block border border-grey-light w-full p-3 rounded mb-4" name="email" placeholder="Email" />
            <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="password" placeholder="Password" />
            <input type="password" className="block border border-grey-light w-full p-3 rounded mb-4" name="confirm_password" placeholder="Confirm Password" />
            <button type="submit" className="w-full text-center py-2 px-8 rounded-lg text-black bg-pink-500  my-3" >Create Account</button>
            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                Terms of Service
              </a> and
              <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="text-grey-dark mt-6">

            Already have an account?
            <Link className="no-underline border-b border-blue font-bold text-black" href="/login"> Login.</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const [email, setemail] = useState('')
    const [error, setError] = useState({ isError: true })
    const request = async () => {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_localhost}/api/authentication/forgot-password`, { email: email })
        if (data.status) {
            // console.log(data.message);
            const { result } = await axios.post(`${process.env.NEXT_PUBLIC_localhost}/api/authentication/reset-password`, { email: email })
            toast.success(data.message)

        }else{
            toast.success(data.message)
        }
    }
    useEffect(() => {

        if (!error.isError) {
            // console.log("chahya");
            request(email)
        }
    }, [error])

    const inputHandle = (email) => {
        const error = {}
        let isError = false
        if (!email) {
            error.email = "please enter email address"
            isError = true
        }
        error.isError = isError
        return error

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const error = inputHandle(email)
        setError(error)
    }
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8  lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white pt-4">
                        <img className="w-8 h-8 mr-2" src="/images-modified.png" alt="logo" />
                        CodesWear
                    </a>
                    <div className="w-full p-6 my-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change Password
                        </h2>
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your email</label>
                                <input type="email" onChange={(e) => setemail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" placeholder="name@company.com" required="" />
                                {error.email && <div style={{ color: "red" }} >{error.email}</div>}
                            </div>

                            <button onClick={(e) => handleSubmit(e)} type="submit" className="w-25 text-black bg-pink-500  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
                            <Link className="no-underline border-b border-blue font-bold text-black" href="/login"> Login.</Link>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ForgotPassword

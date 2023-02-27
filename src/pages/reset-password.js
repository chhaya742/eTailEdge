import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

const ResetPassword = () => {
    const [user, setUser] = useState({ password: "", confirmpassword: "", token: "" })
    const [error, setError] = useState({ isError: true })
    const router = useRouter();

    const request = async () => {
        // user.token = localStorage.getItem("token")
        // console.log(router.query);
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_localhost}/api/authentication/update-password?token=${router.query.token}`, user)
        console.log(data);
        if(data.status){
            localStorage.setItem("token", data.data.token)
            // router.push("/")
        }

    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/")
        }
        if (!error.isError) {
            request(user)
        }
    }, [error])

    const handleError = ({ password, confirmpassword }) => {
        const passvalid = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
        const error = {}
        let isError = false
        if (!password) {
            isError = true
            error.password = "Create a strong password"
        } else {
            if (passvalid.match(password)) {
                isError = true
                error.password = "Enter a valid password"
            }
        }
        if (password &&!confirmpassword) {
            isError = true
            error.confirmpassword = "Please Confirm the password"
        } else {
            if (password !== confirmpassword) {
                isError = true
                error.confirmpassword = "passwords do not match"
            }
        }
        error.isError = isError;
        return error
    }
    const handleInput = (e) => {
        const { name, value } = e
        setUser({ ...user, [name]: value })
    }
    const handleSubmit = (e) => {
        console.log("Chhaya");
        e.preventDefault();
        const error = handleError(user)
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
                                <p className='text-green-600'>Password length should be at least 8 character</p>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                <input onChange={(e) => handleInput(e.target)} value={user.password} type="password" name="password" id="password" placeholder="•••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" required="" />
                                {error.password && <div style={{ color: "red" }}>{error.password}</div>}
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input onChange={(e) => handleInput(e.target)} value={user.confirmpassword} type="confirmpassword" name="confirmpassword" id="confirmpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" required="" />
                                {error.confirmpassword && <div style={{ color: "red" }}>{error.confirmpassword}</div>}
                            </div>

                            <button onClick={(e) => handleSubmit(e)} type="submit" className="w-25 text-black bg-pink-500  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
                            <Link className="no-underline border-b border-blue font-bold text-black" href="/login"> Login.</Link>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

// export async function getServerSideProps(context) {
//     let products = [];
//     let orders = await knex("orders").select("*")
//     orders = JSON.parse(JSON.stringify(orders))
//     for (let i of orders) {
//         const product = await knex("product").select("*").where({ id: i.productid })
//         products.push(Object.values(JSON.parse(JSON.stringify(product)))[0]);
//     }
//     return {
//         props: { orders: orders, product: products }
//     }
// };
export default ResetPassword
import React, { useState, useEffect } from 'react'
import Link from "next/link"
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Signup = () => {
  const router = useRouter()
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({ isError: true })

  const request = async () => {
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_localhost}/api/authentication/signup`, user)
    if (data.status) {
      // console.log(data.data);
      localStorage.setItem("token",data.data.token)
      localStorage.setItem("user",JSON.stringify(data.data))
      toast.success("Your account has created successfully")
      if(localStorage.getItem("token")){
        setTimeout(() => {
          router.push("/")
        }, 1000);
      }
    } else {
      toast.error(data.data.message)
    }
  }

  useEffect(() => {
    
    if (!error.isError) {
      request(user);
    }
  }, [error])

  const handleInput = (e) => {
    const { name, value } = e
    setUser({ ...user, [name]: value })
  }
  const hamdleError = (user) => {
    // const passvalid=^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$
    const passvalid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    const { name, email, password } = user
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
    if (!password) {
      error.password = "password is requiered";
      isError = true;
    }else{
      // console.log(password.match(passvalid));
      if(!password.match(passvalid)){
        error.password =  <p className='text-sm text-green-600 py-2'>Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character should be in passwod:</p>;
        isError = true;
      }
    }
    error.isError = isError;
    return error


  }

  const handleSubmit = () => {
    const error = hamdleError(user);
    setError(error)
  }

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
            <div>
              <input onChange={(e) => handleInput(e.target)} type="text" value={user.name} className="block border border-grey-light w-full p-3 rounded mb-4" name="name" placeholder="Full Name" />
              {error.name && <div style={{ color: "red" }}>{error.name}</div>}
            </div>
            <div>
              <input onChange={(e) => handleInput(e.target)} type="text" value={user.email} className="block border border-grey-light w-full p-3 rounded mb-4" name="email" placeholder="Email" />
              {error.email && <div style={{ color: "red" }}>{error.email}</div>}
            </div>
            <div>
           
              <input onChange={(e) => handleInput(e.target)} type="password" value={user.password} className="block border border-grey-light w-full p-3 rounded mb-4" name="password" placeholder="Password" />
              {error.password && <div style={{ color: "red" }}>{error.password}</div>}
            </div>

            <button onClick={(e) => handleSubmit(e)} type="submit" className="w-full text-center py-2 px-8 rounded-lg text-black bg-pink-500  my-3" >Create Account</button>
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
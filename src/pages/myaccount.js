import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const MyAccount = () => {
    const router=useRouter();
    useEffect(() => {
        if(!localStorage.getItem("token")){
            router.push("/")
          }
    }, [])
    
  return (
    <div className='min-h-screen'>MyAccount</div>
  )
}

export default MyAccount
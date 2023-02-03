import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {AiOutlineShoppingCart} from 'react-icons/Ai'
const NavBar = () => {
    return (
        <div style={{display:"flex",justifyContent:"space-between"}}>
            <div className='logo'>
                <Image src="/logo.png" alt="" width={200} height={40} />
            </div>
            <div style={{fontWeight:"bold"}}>
                <ul className='flex '>
                    <Link href={"/tshirts"}><li style={{padding:"2px"}} >Tshirts</li></Link>
                    <Link href={"/hoodies"}><li style={{padding:"2px"}}>Hoodies</li></Link>
                    <Link href={"/strickers"}><li style={{padding:"2px"}}>Strikers</li></Link>
                    <Link href={"/mugs"}><li style={{padding:"2px"}}>Mugs</li></Link>
                </ul>
            </div>
            <div className='cart position mx-5' style={{padding:"2px" }}>
                <button > <AiOutlineShoppingCart className='text-8xl'/></button>
                
            </div>
        </div>
    )
}

export default NavBar
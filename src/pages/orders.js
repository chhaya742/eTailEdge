import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
const knex = require('../../database-config')
import axios from 'axios'
import Link from "next/link"

const Orders = () => {
  const [token, setToken] = useState('')
  const router = useRouter();

  const [orders, setOrders] = useState([])
  const [product, setProduct] = useState([])
  const request = async (token) => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_localhost}/api/order/get-order`, { token: token })
    setOrders(data.data.orders);
    setProduct(data.data.products);
  }
  useEffect(() => {
    setToken(localStorage.getItem("token"))
    if (!localStorage.getItem("token")) {
      router.push("/")
    } else {
      request(localStorage.getItem("token"))
    }
  }, []);
  // console.log(orders.length);
  return (
    <div className="container text-center">
    <div className="row">
      <div className="col">
        Column
      </div>
      <div className="col">
        Column
      </div>
      <div className="col">
        Column
      </div>
    </div>
  </div>
  )
}

export async function getServerSideProps(context) {
  let products = [];
  let orders = await knex("orders").select("*")
  orders = JSON.parse(JSON.stringify(orders))
  for (let i of orders) {
    const product = await knex("product").select("*").where({ id: i.productid })
    products.push(Object.values(JSON.parse(JSON.stringify(product)))[0]);
  }
  return {
    props: { orders: orders, product: products }
  }
};

// <div className='container mx-auto min-h-screen '>
// <h1 className='font-semibold text-2xl p-8 text-center'> My Orders</h1>
// <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

//   <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
//     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//       <tr>
//         <th scope="col" className="px-6 py-3">
//           Sr no
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Product name
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Color
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Category
//         </th>
//         <th scope="col" className="px-6 py-3">
//           Price
//         </th>
//         <th scope="col" className="px-6 py-3">
//         Details
//          { /*<span className="sr-only">Details</span>*/}
//         </th>
//       </tr>
//     </thead>
//     {orders!=undefined && orders.length>0&& 
//       orders.map((item, index) => {
//         return product[index] != undefined ?
//           <tbody  key={item.id}>
//             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//               <td className="px-6 py-4">
//                 {index + 1}
//               </td>
//               <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                 {product[index].title}
//               </th>
//               <td className="px-6 py-4">
//                 {product[index].color}
//               </td>
//               <td className="px-6 py-4">
//                 {product[index].category}
//               </td>
//               <td className="px-6 py-4">
//                 ${product[index].price}
//               </td>
//               <td className="px-6 py-4">
//                 <Link href={`/order?id=${item.orderId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">view</Link>
//               </td>
//            {  /* <td className="px-6 py-4 text-right">
//                 <Link href={`/order?id=${item.orderId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">view</Link>
//       </td>*/}
//             </tr>
//           </tbody>
//           : ""
//       })
//     }
//   </table>

// </div>
// </div>

export default Orders
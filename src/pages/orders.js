import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
const knex = require('../../database-config')
import axios from 'axios'
import Link from "next/link"
import { IoMdRefreshCircle } from 'react-icons/io'
import { toast } from 'react-toastify'

const Orders = () => {
  const [token, setToken] = useState('')
  const router = useRouter();
  // const [search, setSearch] = useState('')
  const [total, setTotal] = useState(null)
  const [orders, setOrders] = useState([])
  const [product, setProduct] = useState([])

  const [query, setQuery] = useState({
    offset: 0,
    limit: 25,
    search: "",
    order: 'desc',
    sort: 'id',
    token: ""
  })

  const request = async (token, reset_offset = true) => {
    query.token = token
    setQuery(query)
    if (reset_offset) {
      query.offset = 0
      setQuery(query)
    }
    console.log(query);
    await axios.post(`${process.env.NEXT_PUBLIC_localhost}/api/order/get-order`, query).then((res) => {
      // console.log(res.data);
      if (!res.data.status) {
        const resMessage = res.data.data.message
        if (Array.isArray(resMessage)) {
          return toast.error(resMessage[0])
        }
        return toast.error(resMessage)
      }
      // console.log(res);
      let resRow = res.data.data.rows
      setTotal(res.data.total)
      setOrders(resRow);
      setProduct(res.data.data.products);
    })
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
  const handlePagination = e => {
    console.log(e.target.value)
    query.offset =e.target.value * query.limit
    setQuery(query)
    request((token, false))
  }
  const refresClick = () => {
    query.search = ""
    query.status = ""
    setQuery(query)
    request()
  }
  return (

    <div className='container mx-auto min-h-screen '>

      <div className="row my-4 ">

        <div className="col-md-4">
          <img src="/logo.png" alt="" className="w-40 h-15" />
        </div>

        <div className="col-md-4 text-center">
          <h1 className='font-semibold text-2xl '> My Orders</h1>
        </div>

        <div className="col-md-4 relative">
          <div className=''>
            <div>
              <input className='border-2 rounded-lg p-1 absolute right-12 mx-2' type="text" placeholder='search' value={query.search} onChange={e => {
                query.search = e.target.value
                setQuery(query)
                request(token)
              }} />
            </div>
            <div className='text-right'>
              <label>&nbsp;</label>
              <button className='btn btn-primary btn-sm h-8' onClick={refresClick}><IoMdRefreshCircle size={15} /></button>
            </div>
          </div>
        </div>

      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr no
              </th>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Details
                { /*<span className="sr-only">Details</span>*/}
              </th>
            </tr>
          </thead>
          {orders != undefined && orders.length > 0 &&
            orders.map((item, index) => {
              return product[index] != undefined ?
                <tbody key={item.id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      {item.orderId}
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {product[index].title}
                    </th>
                    <td className="px-6 py-4">
                      {product[index].color}
                    </td>
                    <td className="px-6 py-4">
                      {product[index].category}
                    </td>
                    <td className="px-6 py-4">
                      ${product[index].price}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/order?id=${item.orderId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">view</Link>
                    </td>
                    {  /* <td className="px-6 py-4 text-right">
                <Link href={`/order?id=${item.orderId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">view</Link>
      </td>*/}
                  </tr>
                </tbody>
                : ""
            })
          }
        </table>
        <div>
          <div className="mt-2 mb-2">
            <div className="container position-absolute">
              <div className="row"><div className="col-sm-1">
                <select onChange={(e) => {
                  query.limit = e.target.value
                  setQuery(query)
                  request(token)
                }} className="form-select form-select-sm">
                  <option value="2">2</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
                <div className="col-sm-1">
                </div>
              </div>
            </div>
            <ul className="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1">
             {/* <li className="page-item prev-item disabled">
                <a className="page-link" tabIndex="0" role="button" aria-disabled="true" aria-label="Previous page" rel="prev"></a>
              </li>*/}
            <li className="page-item " value="1" onClick={(e)=>handlePagination(e)}>
                <a role="button" className="page-link" tabIndex="0" aria-label="Page 1 is your current page" aria-current="page">1</a>
              </li>
                <li className="page-item" value="1" onClick={(e)=>handlePagination(e)}>
                <a role="button" className="page-link" tabIndex="0" aria-label="Page 2">2</a>
              </li>
              <li className="page-item" value="1" onClick={(e)=>handlePagination(e)}>
                <a role="button" className="page-link" tabIndex="0" aria-label="Page 3">3</a>
              </li>
              <li className="page-item" value="1" onClick={(e)=>handlePagination(e)}>
                <a className="page-link" role="button" tabIndex="0">...</a>
              </li>
              <li className="page-item" value="1" onClick={(e)=>handlePagination(e)}>
                <a role="button" className="page-link" tabIndex="0" aria-label="Page 54">54</a>
              </li>
              <li className="page-item" value="1" onClick={(e)=>handlePagination(e)}>
                <a role="button" className="page-link" tabIndex="0" aria-label="Page 55">55</a>
              </li>
            {/*  <li className="page-item next-item">
                <a className="page-link" tabIndex="0" role="button" aria-disabled="false" aria-label="Next page" rel="next"></a>
              </li>*/}
            </ul>
          </div>
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


// <div className="container text-center min-h-screen my-5  border border-black">
// <div className="row border ">
// <div className="col-sm-2">
//   Sr no
// </div>
//   <div className="col-sm-2">
//     Product name
//   </div>
//   <div className="col-sm-2">
//     Color
//   </div>
//   <div className="col-sm-2">
//     Category
//   </div>
//   <div className="col-sm-2">
//     Price
//   </div>
//   <div className="col-sm-2">
//   Details
//   </div>
// </div>
// </div>


export default Orders
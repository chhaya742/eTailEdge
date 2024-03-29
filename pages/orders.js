import { useRouter } from 'next/router'
import { useEffect, useState, useCallback } from 'react'
const knex = require('../database-config')
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

    await axios.post(`${process.env.NEXT_PUBLIC_localhost}/api/order/get-order`, query).then((res) => {
      console.log("res", res.data);
      if (res.data.error) {
        const resMessage = res.data.data.message
        if (Array.isArray(resMessage)) {
          return toast.error(resMessage[0])
        }
        return toast.error(resMessage)
      }
      console.log(res.data.data.data.rows);
      const resRow = res.data.data.data.rows
      setTotal(res.data.data.total.total)
      setOrders(resRow);
      setProduct(res.data.data.data.products);
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

  const handlePagination = e => {
    const forcePage = Math.ceil(total / query.limit)
    if (forcePage > 1) {
      query.offset = e
      setQuery(query)
      request(token, false)
      // console.log(query);
    }


  }

  const CustomPagination = () => {
    const limit = [2, 10, 25, 50, 100]
    const updateLimit = (e) => {
      query.limit = parseInt(e.target.value)
      setQuery({ ...query })
      request(token)
    }
    // console.log("pageCount", [Math.ceil(total / query.limit)]);

    return (
      <div className="mt-2 mb-2 ">
        <div className="container position-absolute">
          <div className="row">
            <div className="col-sm-1">
              <select className="form-select form-select-sm" onChange={updateLimit} value={query.limit}>
                {
                  limit.map(value => (<option value={value} key={value} >{value}</option>))
                }
              </select>
            </div>
            <div className="col-sm-1">
            </div>
          </div>
        </div>
        <ul className="pagination separated-pagination pagination-sm justify-content-end pe-1">
          {[...Array(Math.ceil(total / query.limit)).keys()].map((item) => {
            return <li key={item} className="page-item" >
              <button role="button" className="page-link" tabIndex="0" aria-label="Page 1 is your current page" aria-current="page" value={item + 1} onClick={(e) => handlePagination(e.target.value)}>{item + 1}</button>
            </li>
          })}
        </ul>
      </div>
    )
  }

  const debounce = (func) => {
    let timer;
    return function () {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func();
      }, 800);
    }
  }

  const debouncedSearch = useCallback(debounce(request), [])
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
              <button className='btn btn-primary btn-sm h-8' onClick={() => {
                query.search = ""
                query.status = ""
                setQuery(query)
                request()
              }}><IoMdRefreshCircle size={15} /></button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative  shadow-md sm:rounded-lg">
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
                Image
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
                    <td className="px-6 py-4">
                      {product[index].title}
                    </td>
                    <td className="px-6 py-4">
                      {<img src={product[index].image} width={34} height={34} />}
                    </td>
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
        <CustomPagination />
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

export default Orders
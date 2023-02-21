import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import knex from '../../database-config'
const Orders = () => {
  const router=useRouter();
  useEffect(() => {
      if(!localStorage.getItem("token")){
          router.push("/")
        }
  }, [])
  
  return (
    <div className='container mx-auto'>
      <h1 className='font-semibold text-2xl p-8 text-center'> Orders</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr no
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
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                1
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">
                Silver
              </td>
              <td className="px-6 py-4">
                Laptop
              </td>
              <td className="px-6 py-4">
                $2999
              </td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                2
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">
                White
              </td>
              <td className="px-6 py-4">
                Laptop PC
              </td>
              <td className="px-6 py-4">
                $1999
              </td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                3
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">
                Black
              </td>
              <td className="px-6 py-4">
                Accessories
              </td>
              <td className="px-6 py-4">
                $99
              </td>
              <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}


export async function getServerSideProps(context) {

  let orders = await knex("order").select("*").where({ userid: "" })
  console.log(orders);
  return {
    props: { orders }
  }
};

export default Orders
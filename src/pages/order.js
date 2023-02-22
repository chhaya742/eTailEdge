import React from 'react'
import Link from "next/link"
import knex from '../../database-config'
const Order = ({ orders ,product}) => {
  console.log(product,orders);
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CodesWear.com</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">OrderId: #4535647</h1>
              <div className="flex mb-4">
                <a className="flex-grow text-center border-b-2  py-2 text-lg px-1">Description</a>
                <a className="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">Reviews</a>
                <a className="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">Details</a>
              </div>
              <p className="leading-relaxed mb-4">Your order has been successfully placed.</p>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Wear the code xl/blue</span>
                <span className="mx-auto text-gray-900">1</span>
                <span className="mx-auto text-gray-900">1</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Wear the code xl/blue</span>
                <span className="mx-auto text-gray-900">1</span>
                <span className="mx-auto text-gray-900">1</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Wear the code xl/blue</span>
                <span className="mx-auto text-gray-900">1</span>
                <span className="mx-auto text-gray-900">1</span>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">SubTotal:  ₹499</span>
                <Link href={"/trackOrder"}>   <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded">Track Order</button></Link>

              </div>
            </div>
            <img alt="ecommerce" className="lg:w-1/2 w-full h-25 b shadow-sm px-24 object-cover object-top rounded" src="/image.png" />
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  // console.log(localStorage.getItem("user"));
  let orders = await knex("orders").select("*")
  
  const product= await knex("product").select("*").where({id:orders[0].productid})

  return {
    props: { orders: JSON.stringify(orders),product:JSON.stringify(product) }
  }
};

export default Order
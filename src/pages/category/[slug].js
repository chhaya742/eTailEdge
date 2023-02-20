import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import knex from '../../../database-config'
const Tshirts = ({ products }) => {
  const router = useRouter()
  const { slug } = router.query
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center">
          {Object.keys(products).length===0 && <p>{`Sorry all the ${slug} are currently out of stock. New stock comming soon Stay Tuned`} </p>}
            {Object.keys(products).map((item) => {
              return <Link key={products[item].id} passHref={true} href={`/product/${products[item].slug}`} legacyBehavior>
                <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
                  <a className="block relative  rounded overflow-hidden">
                    <img alt="ecommerce" className="h-[30vh] md:h-[34vh] m-auto " src={products[item].image}/>
                  </a>
                  <div className="mt-4 text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div>
                      {products[item].size.includes("XS") && <span className='border border-gray-600 mx-1 px-1 py-0'>XS</span>}
                      {products[item].size.includes("S") && <span className='border border-gray-600 mx-1 px-1 py-0'>S</span>}
                      {products[item].size.includes("M") && <span className='border border-gray-600 mx-1 px-1 py-0'>M</span>}
                      {products[item].size.includes("L") && <span className='border border-gray-600 mx-1 px-1 py-0'>L</span>}
                      {products[item].size.includes("XL") && <span className='border border-gray-600 mx-1 px-1 py-0'>X</span>}
                      {products[item].size.includes("XXL") && <span className='border border-gray-600 mx-1 px-1 py-0'>XL</span>}
                    </div>

                    <div>
                      {products[item].color.includes("red") && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes("green") && <button className="border-2 border-gray-300 ml-1 bg-green-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes("blue") && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes("black") && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes("yellow") && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes("gray") && <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>}

                    </div>
                  </div>
                </div>
              </Link>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}


export async function getServerSideProps(context) {
  const { slug } = context.query
  console.log(slug);
  let products = await knex("product").select("*").where({ category: slug })
  products = Object.values(JSON.parse(JSON.stringify(products)));

  let tshirts = {}
  for (let item of products) {
    if (item.title in tshirts) {
      console.log(item.title);
      if (!tshirts[item.title].color.includes(item.color) && item.availableqyt > 0) {
        tshirts[item.title].color.push(item.color)
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableqyt > 0) {
        tshirts[item.title].size.push(item.size)
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableqyt > 0) {
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      }
    }
  }
  // console.log(tshirts);
  return {
    props: { products }
  }
};



export default Tshirts;
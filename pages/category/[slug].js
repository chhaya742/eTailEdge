import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import knex from '../../../database-config'
const Tshirts = ({ products, addToCart }) => {
  const router = useRouter()
  const { slug } = router.query
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center">
            {Object.keys(products).length === 0 && <p>{`Sorry all the ${slug} are currently out of stock. New stock comming soon Stay Tuned`} </p>}
            {Object.keys(products).map((item) => {
              return <div key={products[item].id} className="lg:w-1/6 md:w-1/2 p-4 w-full shadow-sm m-5">
             
                <Link passHref={true} href={`/product/${products[item].slug}`} legacyBehavior>
                  <a className="block relative  rounded overflow-hidden">
                    <img alt="ecommerce" className="h-[30vh] md:h-[34vh] m-auto " src={products[item].image} />
                  </a>
                </Link>
                <div className="mt-4 text-left">
                
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>

                  <p className="mt-1">₹{products[item].price}</p>
                  {products[item].category === "stickers" || products[item].category === "mugs" ? <div>
                    {products[item].size.includes("90") && <span className='border border-gray-600 mx-1 px-1 py-0 cursor-pointer'>90 CM</span>}
                    {products[item].size.includes("80") && <span className='border border-gray-600 mx-1 px-1 py-0  cursor-pointer'>80 CM</span>}
                    {products[item].size.includes("5") && <span className='border border-gray-600 mx-1 px-1 py-0  cursor-pointer'>5 CM</span>}
                    {products[item].size.includes("500") && <span className='border border-gray-600 mx-1 px-1 py-0  cursor-pointer'>500 CM</span>}
                    {products[item].size.includes("3") && <span className='border border-gray-600 mx-1 px-1 py-0  cursor-pointer'>3 CM</span>}
                    {products[item].size.includes("65") && <span className='border border-gray-600 mx-1 px-1 py-0  cursor-pointer'>65 CM</span>}
                  </div> : <div>
                    {products[item].size.includes("XS") && <span className='border border-gray-600 mx-1 px-1 py-0  cursor-pointer'>XS</span>}
                    {products[item].size.includes("S") && <span className='border border-gray-600 mx-1 px-1 py-0  cursor-pointer'>S</span>}
                    {products[item].size.includes("M") && <span className='border border-gray-600 mx-1 px-1 py-0  cursor-pointer'>M</span>}
                    {products[item].size.includes("L") && <span className='border border-gray-600 mx-1 px-1 py-0  cursor-pointer'>L</span>}
                    {products[item].size.includes("XL") && <span className='border border-gray-600 mx-1 px-1 py-0  cursor-pointer'>X</span>}
                    {products[item].size.includes("XXL") && <span className='border border-gray-600 mx-1 px-1 py-0  cursor-pointer'>XL</span>}
                  </div>}

                  <div className='flex relative'>
                    {products[item].color.includes("red") && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes("green") && <button className="border-2 border-gray-300 ml-1 bg-green-300 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes("blue") && <button className="border-2 border-gray-300 ml-1 bg-blue-900 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes("black") && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes("yellow") && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes("gray") && <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes("pink") && <button className="border-2 border-gray-300 ml-1 bg-pink-200 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes("purpel") && <button className="border-2 border-gray-300 ml-1  bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[item].color.includes("orange") && <button className="border-2 border-gray-300 ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    <div className='absolute  right-0'><AiOutlineShoppingCart className='text-3xl' onClick={() => addToCart(products[item].slug, products[item].id,1, products[item].price, products[item].size, `${products[item].title}(${products[item].size}/${products[item].color})`, products[item].color)} /></div>
                  </div>

                </div>
                
              </div>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}


export async function getServerSideProps(context) {
  const { slug } = context.query

  let products = await knex("product").select("*").where({ category: slug })
  products = Object.values(JSON.parse(JSON.stringify(products)));

  let tshirts = {}
  for (let item of products) {
    if (item.title in tshirts) {
   
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
  return {
    props: { products }
  }
};



export default Tshirts;
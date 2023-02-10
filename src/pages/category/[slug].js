import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
const Tshirts = ({ data }) => {
  const router = useRouter()
  const { slug } = router.query
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center">
            {data.data.map((item) => {
              return <Link key={item.id} passHref={true} href={`/product/${item.slug}`} legacyBehavior>
                <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
                  <a className="block relative  rounded overflow-hidden">
                    <img alt="ecommerce" className="h-[30vh] md:h-[34vh] m-auto " src={item.image} />
                  </a>
                  <div className="mt-4 text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{item.category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1">₹{item.price}</p>
                    <p className="mt-1">{item.size}</p>
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
let data;
  await axios.post(`http://localhost:3000/api/product/product-list`, { category: slug })
  .then((response) => {
      // console.log(response.data)
      data=(response.data)
  })
    
  return {
    props: { data }
  }
};


export default Tshirts;
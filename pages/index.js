import Head from 'next/head'
import MySlider from '../components/MySlider'
import { useDispatch } from 'react-redux'
import {incNumber,decNumber  } from '../src/redux/counter';
export default function Home() {

  // const myState = useSelector((state) => { state.changeTheNumber })
  const dispatch = useDispatch()
  // console.log("myState", myState);
  return (
    <>
      <Head>
        <title>eTailEdge.com- Wear the Code</title>
        <meta name="description" content="eTailEdge.com - Weear the Code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Head>
      <main className='bg-slate-200' >
        <div className='container'>
          <h2>Increment /decrement counter</h2>
          <div className='quantity m-3'>
            <button type="button" className="btn btn-info" onClick={()=>dispatch(decNumber())}>-</button>
            <input name="quantity" type='text' className='text-center' value={myState} />
            <button type="button" className="btn btn-info" onClick={()=>dispatch(incNumber())}>+</button>

          </div>
        </div>
        <div className='container mx-auto'>
          <MySlider />
          {  /*<img className="w-full  h-full w-100" src="/banner.png" alt='eTailEdge' />*/}
        </div>
        <div>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Wear the Code with eTailEdge.com</h1>
                <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">wear Whatever you want? What do you want ? you want code ? so why not wear the cose</p>
              </div>
              <div className="flex flex-wrap -m-4">
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
                    <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <circle cx="6" cy="6" r="3"></circle>
                        <circle cx="6" cy="18" r="3"></circle>
                        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">The Catalyzer</h2>
                    <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Neptune</h2>
                    <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Melanchole</h2>
                    <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Bunker</h2>
                    <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                  </div>
                </div>
                <div className="xl:w-1/3 md:w-1/2 p-4">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Ramona Falls</h2>
                    <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

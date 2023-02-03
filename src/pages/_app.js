import '@/styles/globals.css'
import Footer from 'component/Footer'
import NavBar from 'component/NavBar'

export default function App({ Component, pageProps }) {
  return <>
  <NavBar/>
  <Component {...pageProps} />
  <Footer/>
  </>

}

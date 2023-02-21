
import "../styles/globals.css";
import Footer from 'components/Footer'
import NavBar from 'components/NavBar'
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  let router = useRouter();
  const [cart, setCart] = useState({})
  const [total, setTotal] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)
  useEffect(() => {
    console.log("hy this is useeffect from _app.js")
    router.events.on('routeChangeStart', ()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100)
    })
    try {
      if (localStorage.getItem("cart")) {
        console.log(cart);
        setCart(JSON.parse(localStorage.getItem("cart")))

      }

    } catch (error) {
      console.error(error)
      localStorage.clear();
    }
    const token = localStorage.getItem("token")
    if (token) {
      setUser({ value: token })
      setKey(Math.random())
    }
  }, [router.query])

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subtl = 0
    const key = Object.keys(myCart)

    for (let i = 0; i < key.length; i++) {

      subtl += parseInt(myCart[key[i]].price) * parseInt(myCart[key[i]].qyt)

    }
    setTotal(subtl)
  }
  const addToCart = (itemCode, qyt, price, size, name, variant) => {
    let myCart = cart
    if (itemCode in cart) {
      myCart[itemCode].qyt = myCart[itemCode].qyt + qyt
    } else {
      myCart[itemCode] = { qyt: 1, price, size, name, variant }
    }

    setCart(myCart)
    saveCart(myCart)
  }
  const clearCart = () => {
    setCart({})
    saveCart({})
  }
  const removeFromCart = (itemCode, qyt, price, size, name, variant) => {
    let myCart = cart
    if (itemCode in cart) {
      myCart[itemCode].qyt = myCart[itemCode].qyt - qyt
    }

    if (myCart[itemCode].qyt == 0) {
      delete (myCart[itemCode])
    }
    setCart(myCart)
    saveCart(myCart)
  }
  const logout = () => {
    localStorage.removeItem("token")
    setKey(Math.random());
    setUser({ value: null })
    toast.success("You have logged out successfully")
    router.push("/")
    // router.reload()
 
  }
  return <>
    <LoadingBar
      color='#ff2d55'
      progress={progress}
      waitingTime={300}
      onLoaderFinished={() => setProgress(0)}
    />
    <NavBar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeCart={removeFromCart} clearCart={clearCart} subtl={total} />
    <Component cart={cart} addToCart={addToCart} removeCart={removeFromCart} clearCart={clearCart} subtl={total} {...pageProps} />
    <Footer />
    <ToastContainer position="top-right" autoClose={1000} pauseOnHover={false} />
  </>
}

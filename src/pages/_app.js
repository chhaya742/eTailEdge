
import "../styles/globals.css";
import Footer from 'components/Footer'
import NavBar from 'components/NavBar'
import { useEffect, useState } from "react";
import { AiOutlineConsoleSql } from "react-icons/Ai";


export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [total, setTotal] = useState(0)

  useEffect(() => {
    console.log("hy this is useeffect from _app.js")
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
       
      }

    } catch (error) {
      console.error(error)
      localStorage.clear();
    }
  }, [])

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
  return <>
    <NavBar  cart={cart} addToCart={addToCart} removeCart={removeFromCart} clearCart={clearCart} subtl={total} />
    <Component cart={cart} addToCart={addToCart} removeCart={removeFromCart} clearCart={clearCart} subtl={total} {...pageProps} />
    <Footer />
  </>

}

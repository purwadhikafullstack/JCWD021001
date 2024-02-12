// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCart } from '../../../pages/cart/services/getCart'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0)
  const [cartData, setCartData] = useState([])
  const user = useSelector((state) => state.AuthReducer.user)

  const fetchCartCount = async () => {
    try {
      const resCart = await getCart(user?.id)
      setCartCount(
        resCart.reduce((acc, cart) => acc + (cart.CartProducts ? cart.CartProducts.length : 0), 0),
      )
      setCartData(resCart)
    } catch (err) {
      toast.error(err)
    }
  }

  useEffect(() => {
    if (user?.roleId === 3) {
      fetchCartCount()
    }
  }, [user?.id])

  const values = {
    cartData,
    cartCount,
    fetchCartCount,
  }

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>
}

export const useCart = () => {
  return useContext(CartContext)
}

import React from 'react'
import { Box } from '@chakra-ui/react'
import OrderBody from '../../components/order'
import { useState, useEffect } from 'react'
import { getCart } from '../cart/services/getCart'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const Order = () => {
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const stockData = location.state ? location.state.stockData : null
  const totalPrice = location.state ? location.state.totalPrice : null
  const totalQuantity = location.state ? location.state.totalQuantity : null

  const user = useSelector((state) => state.AuthReducer.user)


  useEffect(() => {
    localStorage.removeItem('hasVisitedCart')
    const fetchOrderData = async () => {
      try {
        const data = await getCart(user?.id, stockData) // Assuming getCart fetches order data
        setOrderData(data)
      } catch (error) {
        toast.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (orderData.length === 0) {
      fetchOrderData()
    }
  }, [orderData])

  // Render nothing if data is still being fetched
  if (loading) {
    return null
  }

  return (
    <Box maxW={'100vw'} minH={'100vh'} overflow={'hidden'} bgColor={'brand.grey100'}>
      <Navbar />
      <Box>
        <OrderBody orderData={orderData} stockData={stockData} totalPrice={totalPrice} totalQuantity={totalQuantity}/>
      </Box>
    </Box>
  )
}

export default Order

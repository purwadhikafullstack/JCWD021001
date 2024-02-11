import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import OrderBody from '../../components/order'
import { useState, useEffect } from 'react'
import { getCart } from '../cart/services/getCart'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import { useSelector } from 'react-redux'

const Order = () => {
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
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
        console.error('Error fetching order data:', error)
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

  // // Handle errors
  // if (error) {
  //   return (
  //     <Box>
  //       <Text>Error: {error}</Text>
  //     </Box>
  //   );
  // }

  return (
    <>
      <Navbar />
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <OrderBody orderData={orderData} stockData={stockData} totalPrice={totalPrice} totalQuantity={totalQuantity}/>
      </Box>
    </>
  )
}

export default Order

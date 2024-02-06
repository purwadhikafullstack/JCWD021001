import React from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import OrderBody from '../../components/order'
import { useState, useEffect } from 'react'
import { getCart } from '../cart/services/getCart'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'

const Order = () => {
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const stockData = location.state ? location.state.stockData : null
  const totalPrice = location.state ? location.state.totalPrice : null
  const totalQuantity = location.state ? location.state.totalQuantity : null
  // console.log('sss', stockData);

  useEffect(() => {
    localStorage.removeItem('hasVisitedCart')
    const fetchOrderData = async () => {
      try {
        const data = await getCart(stockData) // Assuming getCart fetches order data
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

  return (
    <>
      <Navbar />
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <OrderBody orderData={orderData} totalPrice={totalPrice} totalQuantity={totalQuantity}/>
      </Box>
    </>
  )
}

export default Order

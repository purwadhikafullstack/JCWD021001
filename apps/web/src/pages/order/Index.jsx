import React from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import OrderBody from '../../components/order'
import { useState, useEffect } from 'react'
import { Navbar } from '../../components/navbar'
import { getCart } from '../cart/services/getCart'

const Order = () => {
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const data = await getCart() // Assuming getCart fetches order data
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
        <OrderBody orderData={orderData} />
      </Box>
    </>
  )
}

export default Order

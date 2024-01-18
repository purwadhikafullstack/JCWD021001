import React from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import { CreateOrder } from './services/CreateOrder'
import { CreatePayment } from './services/CreatePayment'
import OrderBody from '../../components/order'
import { getOrder } from './services/getOrder'
import { useState, useEffect } from 'react'
import { Navbar } from '../../components/navbar'
import { useLocation } from 'react-router-dom'
import { paymentGateway } from './services/paymentGateway'

const Order = () => {
  const [orderData, setOrderData] = useState([])
  const location = useLocation()
  const orderId = location.state?.orderId

  // console.log('order', orderData)

  const refreshOrder = async () => {
    try {
      const data = await getOrder(orderId)
      setOrderData(data)
    } catch (error) {
      console.error('Error fetching cart data:', error)
    }
  }

  useEffect(() => {
    refreshOrder()
  }, [orderId])

  return (
    // <Box>
    //     <Button colorScheme='blue' onClick={handleCheckout}>Checkout</Button>
    // </Box>
    <>
      <Navbar />
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <OrderBody orderData={orderData} />
      </Box>
    </>
  )
}

export default Order

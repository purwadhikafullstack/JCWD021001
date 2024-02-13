import React, { useEffect, useState } from 'react'
import { Box  } from '@chakra-ui/react'
import { Navbar } from '../../components/Navbar'
import OrderDetailsBody from '../../components/order-details'
import { getOrderDetail } from './service/getOrderDetail'
import { useLocation } from 'react-router-dom'


const OrderDetails = () => {
  const location = useLocation()
  const orderId = location.state ? location.state.orderId : null

  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const data = await getOrderDetail(orderId) 
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
        <OrderDetailsBody orderData={orderData} />
      </Box>
    </Box>
  )
}

export default OrderDetails

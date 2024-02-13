import React, { useEffect, useState } from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import { Navbar } from '../../components/Navbar'
import OrderManagementDetailBody from '../../components/order-management-details'
import { useLocation } from 'react-router-dom'
import { getOrderDetail } from '../order-details/service/getOrderDetail'

const OrderManagementDetails = () => {
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
    <>
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <OrderManagementDetailBody orderData={orderData}/>
      </Box>
    </>
  )
}
export default OrderManagementDetails

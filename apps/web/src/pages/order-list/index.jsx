import React, { useEffect, useState } from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import { Navbar } from '../../components/navbar'
import OrderListBody from '../../components/order-list'
import { getOrder } from '../order/services/getOrder'
import { useLocation } from 'react-router-dom'

const OrderList = () => {
  const [orderData, setOrderData] = useState([])
  const location = useLocation()
  // const orderId = location.state?.orderId;
  const [loading, setLoading] = useState(true)

  const refreshOrder = async () => {
    try {
      const data = await getOrder()
      setOrderData(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching cart data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshOrder()
  }, [])
  useEffect(() => {
    const shouldRefresh = location.state?.refresh
    if (shouldRefresh) {
      refreshOrder()
    }
  }, [location.state?.refresh]) // Add orderData as a dependency to re-run the effect when orderData changes

  return (
    <>
      <Navbar />
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <OrderListBody orderData={orderData} loading={loading}/>
      </Box>
    </>
  )
}
export default OrderList

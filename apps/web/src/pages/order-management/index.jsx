import React, { useEffect, useState } from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import { Navbar } from '../../components/Navbar'
import OrderManagementBody from '../../components/order-management'
import { getOrderManagement } from './service/getOrderManagement'
import { getWarehouse } from './service/getWarehouse'

const OrderManagement = () => {
  const [orderData, setOrderData] = useState([])
  const [warehouseData, setWarehouseData] = useState([])

  const refreshOrder = async (orderNumber, orderDate, warehouseId) => {
    try {
      const data = await getOrderManagement(orderNumber, orderDate, warehouseId)
      setOrderData(data)
      // setLoading(false)
    } catch (error) {
      console.error('Error fetching cart data:', error)
      // setLoading(false)
    }
  }
  const refreshWarehouse = async () => {
    try {
      const data = await getWarehouse()
      setWarehouseData(data)
      // setLoading(false)
    } catch (error) {
      console.error('Error fetching warehouse data:', error)
      // setLoading(false)
    }
  }
  useEffect(() => {
    refreshOrder()
    refreshWarehouse()
  }, [])

  const handleOrderNumberSubmit = (orderNumber) => {
    refreshOrder(orderNumber)
  }

  const handleOrderDateSubmit = (orderDate) => {
    refreshOrder(undefined, orderDate)
  }

  const handleWarehouseSubmit = (warehouseId) => {
    refreshOrder(undefined, undefined, warehouseId)
  }
  return (
    <>
      <Navbar />
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <OrderManagementBody
          orderData={orderData}
          warehouseData={warehouseData}
          onOrderNumberSubmit={handleOrderNumberSubmit}
          onOrderDateSubmit={handleOrderDateSubmit}
          onWarehouseSubmit={handleWarehouseSubmit}
        />
      </Box>
    </>
  )
}
export default OrderManagement

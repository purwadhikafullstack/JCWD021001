import React, { useEffect, useState } from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import { Navbar } from '../../components/Navbar'
import OrderListBody from '../../components/order-list'
import { getOrder } from '../order/services/getOrder'
import { useLocation } from 'react-router-dom'

const OrderList = () => {
  const [orderData, setOrderData] = useState([])
  const location = useLocation()
  // const orderId = location.state?.orderId;
  const [loading, setLoading] = useState(true)
  const [selectOrderStatusId, setSelectOrderStatusId] = useState(1)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [pagination, setPagination] = useState([])
  console.log('orderData', orderData)
  console.log('pagination', pagination)

  const refreshOrder = async (orderNumber, orderDate) => {
    try {
      const data = await getOrder(orderNumber, orderDate, selectOrderStatusId, page, pageSize)
      setOrderData(data?.orders)
      setPagination(data?.pagination)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching order data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshOrder()
  }, [page, pageSize])
  useEffect(() => {
    const shouldRefresh = location.state?.refresh
    if (shouldRefresh) {
      refreshOrder()
    }
  }, [location.state?.refresh]) // Add orderData as a dependency to re-run the effect when orderData changes

  const handleOrderNumberSubmit = (orderNumber) => {
    refreshOrder(orderNumber)
  }

  const handleOrderDateSubmit = (orderDate) => {
    refreshOrder(undefined, orderDate)
  }

  const handleTabClick = (orderStatusId) => {
    setSelectOrderStatusId(orderStatusId)
    // You can perform any additional actions on tab click if needed
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    refreshOrder()
  }

  return (
    <>
      <Navbar />
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <OrderListBody
          orderData={orderData}
          loading={loading}
          onOrderNumberSubmit={handleOrderNumberSubmit}
          onOrderDateSubmit={handleOrderDateSubmit}
          onTabClick={handleTabClick}
          onPageChange={handlePageChange}
          pagination={pagination}
        />
      </Box>
    </>
  )
}
export default OrderList

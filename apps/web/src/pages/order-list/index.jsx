import React, { useEffect, useRef, useState } from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import { Navbar } from '../../components/Navbar'
import OrderListBody from '../../components/order-list'
import { getOrder } from '../order/services/getOrder'
import { useLocation } from 'react-router-dom'

const OrderList = () => {
  const [orderData, setOrderData] = useState([])
  // const [orderDate, setOrderDate] = useState('')
  const orderDateRef = useRef('')
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  // const [selectOrderStatusId, setSelectOrderStatusId] = useState([1])
  const [selectOrderStatusId, setSelectOrderStatusId] = useState(() => {
    const storedTab = localStorage.getItem('status');
  return location.state?.status || (storedTab ? JSON.parse(storedTab) : [1]);
  })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [pagination, setPagination] = useState([])

  const refreshOrder = async (orderNumber) => {
    try {
      const data = await getOrder(
        orderNumber,
        orderDateRef.current,
        selectOrderStatusId,
        page,
        pageSize,
      )
      setOrderData(data?.orders)
      setPagination(data?.pagination)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching order data:', error)
      setLoading(false)
    }
  }

  const handleOrderNumberSubmit = (orderNumber) => {
    refreshOrder(orderNumber)
  }

  const handleOrderDateSubmit = (date) => {
    // setOrderDate(date)
    orderDateRef.current = date
    refreshOrder(undefined)
  }

  const handleTabClick = (...additionalParams) => {
    setSelectOrderStatusId([...additionalParams])
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
    // refreshOrder();
  }

  useEffect(() => {
    refreshOrder()
  }, [page, pageSize, selectOrderStatusId])
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

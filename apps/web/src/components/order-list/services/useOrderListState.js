import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBreakpointValue } from '@chakra-ui/react'
import { updateOrder } from '../../../pages/order/services/updateOrder'
import { useToast } from '@chakra-ui/react'

const useOrderListState = ({
  orderData,
  loading,
  onOrderNumberSubmit,
  onOrderDateSubmit,
  refreshOrder,
  onTabClick,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()

  const [orderNumber, setOrderNumber] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [activeTab, setActiveTab] = useState(() => {
    const storedTab = localStorage.getItem('activeTab')
    return location.state?.activeTab || 0
  })

  useEffect(() => {}, [orderData, loading])

  const handlePayNowClick = (orderId) => {
    const orderToPay = orderData.find((order) => order.id === orderId)
    if (orderToPay) {
      navigate('/payment', { state: { orderData: [orderToPay] } })
    } else {
      console.error('Order not found.')
    }
  }

  const handleTabChange = (index) => {
    setActiveTab(index)
    navigate('.', { state: { activeTab: index } })
  }

  const handleTabClick = (orderStatusId, ...additionalParams) => {
    // Konversi orderStatusId ke integer sebelum mengirimkannya
    const parsedOrderStatusId = parseInt(orderStatusId, 10)
    localStorage.setItem('status', JSON.stringify([parsedOrderStatusId, ...additionalParams]))
    onTabClick(parsedOrderStatusId, ...additionalParams)
  }

  const [expandedProducts, setExpandedProducts] = useState({})

  const handleToggleProducts = (orderId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  const [isTabListVisible, setTabListVisible] = useState(false)

  const handleToggleTabList = () => {
    setTabListVisible(!isTabListVisible)
  }

  const isMobile = useBreakpointValue({ base: true, md: false })

  const handleOrderNumberChange = (event) => {
    setOrderNumber(event.target.value)
  }

  const handleOrderDateChange = (event) => {
    setOrderDate(event.target.value)
    onOrderDateSubmit(event.target.value)
  }

  const handleOrderNumberSubmit = () => {
    onOrderNumberSubmit(orderNumber)
  }

  const handleOrderNumberKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onOrderNumberSubmit(orderNumber)
    }
  }

  const formatDate = (dateString) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }
    return new Date(dateString).toLocaleDateString('id-ID', options).replace(/\//g, '-')
  }

  // Customer Confirm
  const handleConfirmButton = async (orderId) => {
    try {
      // Find the corresponding order based on orderId
      const clickedItem = orderData.find((order) => order.id === orderId)

      if (clickedItem) {
        const newUpdateOrder = {
          orderId: clickedItem?.id,
          orderStatusId: 5,
        }
        // Update the order status after processing OrderProducts
        const updateOrderRes = await updateOrder(newUpdateOrder)
        // Handle success for updateOrder
        toast({
          title: `${updateOrderRes?.data?.message}`,
          status: 'success',
          placement: 'bottom',
        })
      }
      setTimeout(() => {
        handleTabChange(3);
        handleTabClick(5);
      }, 2000);
    } catch (err) {
      // Handle error for finding the order
      toast({
        title: `${err?.message}`,
        status: 'error',
      })
    }
  }

  // cancel
  const handleCancelButton = async (orderId) => {
    const clickedItem = orderData.find((order) => order.id === orderId)
    try {
      const newUpdateOrder = {
        orderId: clickedItem?.id,
        orderStatusId: 6,
      }
      // Update the order status after processing OrderProducts
      const updateOrderRes = await updateOrder(newUpdateOrder)
      // Handle success for updateOrder
      toast({
        title: `${updateOrderRes?.data?.message}`,
        status: 'success',
        placement: 'bottom',
      })
      setTimeout(() => {
        handleTabChange(4);
        handleTabClick(6);
      }, 2000);
    } catch (err) {
      // Handle error for updateOrder
      toast({
        title: `${err?.message}`,
        status: 'error',
      })
    }
  }

  return {
    activeTab,
    expandedProducts,
    isTabListVisible,
    isMobile,
    orderNumber,
    orderDate,
    handlePayNowClick,
    handleTabChange,
    handleToggleProducts,
    handleToggleTabList,
    handleOrderNumberChange,
    handleOrderDateChange,
    handleOrderNumberSubmit,
    handleOrderNumberKeyPress,
    formatDate,
    handleConfirmButton,
    handleCancelButton,
    handleTabClick,
  }
}

export default useOrderListState

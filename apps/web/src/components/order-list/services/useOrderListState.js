import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBreakpointValue } from '@chakra-ui/react'

const useOrderListState = ({ orderData, loading, onOrderNumberSubmit, onOrderDateSubmit }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [sortedOrderData, setSortedOrderData] = useState([])
  const [orderNumber, setOrderNumber] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [activeTab, setActiveTab] = useState(() => {
    const storedTab = localStorage.getItem('activeTab')
    return location.state?.activeTab || 0
  })

  useEffect(() => {
    if (!loading && orderData && orderData.length > 0 && orderData[0].orderDate) {
      // Sort orderData based on the orderDate in descending order
      const sortedData = [...orderData].sort((a, b) => {
        const dateA = new Date(a.orderDate).getTime()
        const dateB = new Date(b.orderDate).getTime()
        return dateB - dateA
      })
      // Update sortedOrderData with the sorted data
      setSortedOrderData(sortedData)
    } else {
      // If orderData is empty or doesn't have valid data, set sortedOrderData to an empty array
      setSortedOrderData([])
    }
  }, [orderData, loading])

  const waitingPaymentOrders = sortedOrderData?.filter(
    (order) => order?.Payment?.paymentStatus === 'pending',
  )
  console.log('waiting', waitingPaymentOrders)
  console.log('orderData', orderData)
  console.log('sorted', sortedOrderData)

  const onProcessOrders = sortedOrderData?.filter(
    (order) => order?.Payment?.paymentStatus === 'settlement',
  )

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
    setOrderNumber('')
  }

  const handleOrderNumberKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onOrderNumberSubmit(orderNumber)
      setOrderNumber('')
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




  return {
    activeTab,
    waitingPaymentOrders,
    onProcessOrders,
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

  }
}

export default useOrderListState

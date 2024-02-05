import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBreakpointValue } from '@chakra-ui/react'

const useOrderListState = ({ orderData, loading, onOrderNumberSubmit, onOrderDateSubmit }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [orderNumber, setOrderNumber] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [activeTab, setActiveTab] = useState(() => {
    const storedTab = localStorage.getItem('activeTab')
    return location.state?.activeTab || 0
  })

  useEffect(() => {
  }, [orderData, loading])

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

  }
}

export default useOrderListState

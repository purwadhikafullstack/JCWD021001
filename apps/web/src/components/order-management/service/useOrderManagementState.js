import React, { useEffect, useState } from 'react'
import { useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { createStockJournal } from '../../../pages/dashboard/components/stock-management/services/createStocks'
import { updateOrder } from '../../../pages/order/services/updateOrder'
import { getCheckStock } from '../../../pages/order-management/service/getCheckStock'
import { createMutation } from '../../../pages/dashboard/components/stock-mutation/services/createMutation'

const useOrderManagementState = ({
  orderData,
  onOrderNumberSubmit,
  onOrderDateSubmit,
  onWarehouseSubmit,
  onTabClick,
}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [orderNumber, setOrderNumber] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  const [checkStock, setCheckStock] = useState([])
  const [expandedProducts, setExpandedProducts] = useState({})
  const [activeTab, setActiveTab] = useState(() => {
    const storedTab = localStorage.getItem('activeTabOrder')
    return location.state?.activeTab || 0
  })

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

  const handleToggleProducts = (orderId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  //cancel
  const handleCanceltOnProcess = async (orderId) => {
    let transactionSuccess = false // Flag to track transaction status

    try {
      const clickedItem = orderData.find((order) => order.id === orderId)

      if (!clickedItem) {
        throw new Error('Order not found')
      }

      // Map OrderProducts to an array of parameters
      const orderProducts = clickedItem.OrderProducts.map((product) => ({
        productId: product?.stocks?.product?.id,
        warehouseId: clickedItem?.warehouse?.id,
        sizeId: product?.stocks?.size?.id,
        colourId: product?.stocks?.colour?.id,
        qty: product?.quantity,
        isUpdate: false,
        isAdding: 1,
      }))

      // Loop through orderProducts and call createStockJournal for each
      for (const productParams of orderProducts) {
        try {
          // Call createStockJournal for each OrderProduct
          const res = await createStockJournal(
            productParams.productId,
            productParams.warehouseId,
            productParams.sizeId,
            productParams.colourId,
            productParams.qty,
            productParams.isUpdate,
            productParams.isAdding,
          )
        } catch (err) {
          toast.error(err)
        }
      }

      // Update the order status after processing OrderProducts
      const newUpdateOrder = {
        orderId: clickedItem?.id,
        orderStatusId: 6,
      }

      const res = await updateOrder(newUpdateOrder)
      // Commit transaction
      transactionSuccess = true
      toast.success(res)
      setTimeout(() => {
        handleTabChange(4)
        handleTabClick(6)
      }, 2000)
    } catch (err) {
      toast.error(err)
    }
  }

  const handleAcceptButton = async (orderId) => {
    let allOperationsSuccessful = true // Flag to track whether all operations were successful

    try {
      // Find the corresponding order based on orderId
      const clickedItem = orderData.find((order) => order.id === orderId)

      if (!clickedItem) {
        throw new Error('Order not found')
      }

      // Map OrderProducts to an array of parameters
      const orderProducts = clickedItem.OrderProducts.map((product) => ({
        productId: product?.stocks?.product?.id,
        warehouseId: clickedItem?.warehouse?.id,
        sizeId: product?.stocks?.size?.id,
        colourId: product?.stocks?.colour?.id,
        qty: product?.quantity,
        isUpdate: false,
      }))

      // Loop through orderProducts and handle based on checkStock status
      for (const productParams of orderProducts) {
        const matchingStock = checkStock.find(
          (stock) => stock.productId === productParams.productId,
        )

        if (matchingStock) {
          if (matchingStock.status === 'Insufficient Stock') {
            // Create mutation
            try {
              const res = await createMutation(
                matchingStock.selectedWarehouse.id, // requesterWarehouseId
                matchingStock.nearestWarehouse.id, // recipientWarehouseId
                matchingStock.needSelectedWarehouseQuantity, // qty
                1, // isAccepted
                matchingStock.stockId, // stockId
              )
            } catch (mutationError) {
              toast.error('mutation error')
              allOperationsSuccessful = false // Set flag to false if mutation fails
            }
          } else if (matchingStock.status === 'Available') {
            // Create stock journal
            try {
              const res = await createStockJournal(
                productParams.productId,
                productParams.warehouseId,
                productParams.sizeId,
                productParams.colourId,
                productParams.qty,
                productParams.isUpdate,
              )
            } catch (error) {
              toast.error('stock journal error')
              allOperationsSuccessful = false // Set flag to false if stock journal creation fails
            }
          }
        }
      }

      if (allOperationsSuccessful) {
        // Update the order status after processing OrderProducts
        const newUpdateOrder = {
          orderId: clickedItem?.id,
          orderStatusId: 3,
        }

        try {
          const res = await updateOrder(newUpdateOrder)
          toast.success(res)
          setTimeout(() => {
            handleTabChange(1)
            handleTabClick(3)
          }, 2000)
        } catch (err) {
          toast.error(err)
        }
      }
    } catch (err) {
      toast.error(err)
    }
  }

  // reject
  const handleRejectButton = async (orderId) => {
    const clickedItem = orderData.find((order) => order.id === orderId)
    try {
      const newUpdateOrder = {
        orderId: clickedItem?.id,
        orderStatusId: 6,
      }
      const res = await updateOrder(newUpdateOrder)
      toast.success(res)
      setTimeout(() => {
        handleTabChange(4)
        handleTabClick(6)
      }, 2000)
    } catch (updateOrderError) {
      toast.error(err)
    }
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
    // Automatically submit order date when the date changes
    onOrderDateSubmit(event.target.value)
  }

  const handleOrderNumberSubmit = () => {
    onOrderNumberSubmit(orderNumber)
  }

  const handleOrderNumberKeyPress = (event) => {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
      event.preventDefault()
      // Submit the order number when Enter key is pressed
      onOrderNumberSubmit(orderNumber)
    }
  }

  const handleSelectWarehouseChange = (event) => {
    setSelectedWarehouse(event.target.value)
    onWarehouseSubmit(event.target.value)
  }

  const handleCheckStock = async (orderId) => {
    try {
      const check = await getCheckStock(orderId)
      setCheckStock(check)
      onOpen()
    } catch (err) {
      toast.error(err)
    }
  }

  // Customer Confirm
  const handleSendButton = async (orderId) => {
    try {
      // Find the corresponding order based on orderId
      const clickedItem = orderData.find((order) => order.id === orderId)

      if (clickedItem) {
        const newUpdateOrder = {
          orderId: clickedItem?.id,
          orderStatusId: 4,
        }
        const res = await updateOrder(newUpdateOrder)
        toast.success(res)
        setTimeout(() => {
          handleTabChange(2)
          handleTabClick(4)
        }, 2000)
      }
    } catch (err) {
      toast.error(err)
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
    expandedProducts,
    orderNumber,
    orderDate,
    selectedWarehouse,
    isMobile,
    isTabListVisible,
    handleToggleProducts,
    handleAcceptButton,
    handleRejectButton,
    handleToggleTabList,
    handleOrderNumberChange,
    handleOrderDateChange,
    handleOrderNumberSubmit,
    handleOrderNumberKeyPress,
    handleSelectWarehouseChange,
    checkStock,
    handleCheckStock,
    isOpen,
    onClose,
    handleSendButton,
    handleCanceltOnProcess,
    handleTabChange,
    activeTab,
    handleTabClick,
    formatDate,
  }
}

export default useOrderManagementState

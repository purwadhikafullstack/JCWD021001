import React, { useEffect, useState } from 'react'
import { useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { createStockJournal } from '../../../pages/dashboard/components/stock-management/services/createStocks'
import { updateOrder } from '../../../pages/order/services/updateOrder'
import { getCheckStock } from '../../../pages/order-management/service/getCheckStock'

const useOrderManagementState = ({
  orderData,
  onOrderNumberSubmit,
  onOrderDateSubmit,
  onWarehouseSubmit,
}) => {
  const [orderNumber, setOrderNumber] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [selectedWarehouse, setSelectedWarehouse] = useState('')
  const [checkStock, setCheckStock] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toast = useToast()
  const navigate = useNavigate()

  const [expandedProducts, setExpandedProducts] = useState({})

  const handleToggleProducts = (orderId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  // stock journal
  const handleAcceptButton = async (orderId) => {
    try {
      // Find the corresponding order based on orderId
      const clickedItem = orderData.find((order) => order.id === orderId)

      if (clickedItem) {
        // Map OrderProducts to an array of parameters
        const orderProducts = clickedItem.OrderProducts.map((product) => ({
          productId: product?.stocks?.product?.id,
          warehouseId: clickedItem?.warehouse?.id,
          sizeId: product?.stocks?.size?.id,
          colourId: product?.stocks?.colour?.id,
          qty: product?.quantity,
          isUpdate: false,
        }))

        // // Loop through orderProducts and call createStockJournal for each
        // for (const productParams of orderProducts) {
        //   try {
        //     // Call createStockJournal for each OrderProduct
        //     const res = await createStockJournal(
        //       productParams.productId,
        //       productParams.warehouseId,
        //       productParams.sizeId,
        //       productParams.colourId,
        //       productParams.qty,
        //       productParams.isUpdate,
        //     )

        //     // Handle success for each OrderProduct
        //     toast({
        //       title: `${res?.data?.message}`,
        //       status: 'success',
        //       placement: 'bottom',
        //     })
        //   } catch (error) {
        //     // Handle error for each OrderProduct
        //     toast({
        //       title: `${error?.message}`,
        //       status: 'error',
        //     })
        //   }
        // }

        try {
          const newUpdateOrder = {
            orderId: clickedItem?.id,
            orderStatusId: 3,
          }
          // Update the order status after processing OrderProducts
          const updateOrderRes = await updateOrder(newUpdateOrder)
          // Handle success for updateOrder
          toast({
            title: `${updateOrderRes?.data?.message}`,
            status: 'success',
            placement: 'bottom',
          })
        } catch (updateOrderError) {
          // Handle error for updateOrder
          toast({
            title: `${updateOrderError?.message}`,
            status: 'error',
          })
        }
      }
    } catch (err) {
      // Handle error for finding the order
      toast({
        title: `${err?.message}`,
        status: 'error',
      })
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
      // Update the order status after processing OrderProducts
      const updateOrderRes = await updateOrder(newUpdateOrder)
      // Handle success for updateOrder
      toast({
        title: `${updateOrderRes?.data?.message}`,
        status: 'success',
        placement: 'bottom',
      })
    } catch (updateOrderError) {
      // Handle error for updateOrder
      toast({
        title: `${updateOrderError?.message}`,
        status: 'error',
      })
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
      console.log(err)
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
        // Update the order status after processing OrderProducts
        const updateOrderRes = await updateOrder(newUpdateOrder)
        // Handle success for updateOrder
        toast({
          title: `${updateOrderRes?.data?.message}`,
          status: 'success',
          placement: 'bottom',
        })
      }
    } catch (err) {
      // Handle error for finding the order
      toast({
        title: `${err?.message}`,
        status: 'error',
      })
    }
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
  }
}

export default useOrderManagementState

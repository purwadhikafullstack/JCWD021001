import React, { useEffect, useState } from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import { Navbar } from '../../components/Navbar'
import OrderManagementDetailBody from '../../components/order-management-details'

const OrderManagementDetails = () => {
  return (
    <>
      <Navbar />
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <OrderManagementDetailBody />
      </Box>
    </>
  )
}
export default OrderManagementDetails

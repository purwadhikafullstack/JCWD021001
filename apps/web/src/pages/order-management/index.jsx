import React, { useEffect, useState } from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import { Navbar } from '../../components/navbar'
import OrderManagementBody from '../../components/order-management'

const OrderManagement = () => {
  return (
    <>
      <Navbar />
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <OrderManagementBody />
      </Box>
    </>
  )
}
export default OrderManagement

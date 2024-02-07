import React from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import { Navbar } from '../../components/Navbar'
import OrderDetailsBody from '../../components/order-details'

const OrderDetails = () => {
  return (
    <>
      <Navbar />
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <OrderDetailsBody />
      </Box>
    </>
  )
}

export default OrderDetails

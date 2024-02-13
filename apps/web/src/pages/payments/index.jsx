import React from 'react'
import { Box } from '@chakra-ui/react'
import { Navbar } from '../../components/Navbar'
import PaymentBody from '../../components/payment'
import { useLocation } from 'react-router-dom'

const Payment = () => {
  const location = useLocation()
  const { orderData } = location.state || {}
  return (
    <Box maxW={'100vw'} minH={'100vh'} overflow={'hidden'} bgColor={'brand.grey100'}>
      <Navbar />
      <Box>
        <PaymentBody orderData={orderData} />
      </Box>
    </Box>
  )
}

export default Payment

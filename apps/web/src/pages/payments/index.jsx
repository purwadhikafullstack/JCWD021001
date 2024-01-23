import React from 'react';
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react';
import { Navbar } from '../../components/navbar';
import PaymentBody from '../../components/payment';
import { useLocation } from 'react-router-dom';

const Payment = () => {
  // console.log('new', orderData);
  const location = useLocation();
  const { orderData } = location.state || {};
  console.log('new', orderData);
  return (
    <>
      <Navbar />
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <PaymentBody orderData={orderData} />
      </Box>
    </>
  )
}

export default Payment

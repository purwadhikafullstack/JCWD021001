import React, { useState } from 'react'
import { Box, Text, Icon } from '@chakra-ui/react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { paymentHandler } from './services/paymentHandler'
import OrderBodyDesktop from './order-body-dekstop'
import OrderBodyMobile from './order-body-mobile'
import ShoppingSummaryDesktop from './shopping-summary-dekstop'
import ShoppingSummaryMobile from './shopping-summary-mobile'
import DeliveryAddress from './deliveryAddress'

const OrderBody = ({ orderData, stockOrder, totalPrice, totalQuantity }) => {
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [nearestWarehouse, setNearestWarehouse] = useState(null)
  const [shippingCost, setShippingCost] = useState(null)
  const navigate = useNavigate()

  // handle payment
  const handlePaymentClick = (orderItem) => {
    paymentHandler(
      orderItem,
      stockOrder,
      selectedAddress,
      nearestWarehouse,
      shippingCost,
      totalPrice,
      totalQuantity,
      navigate,
    )
  }
  return (
    <Box>
      {orderData.map((orderItem) => (
        <Box key={orderItem.id}>
          <Box padding={{ base: '24px 24px 280px 24px', xl: '24px' }}>
            {/* header */}
            <Box display={'flex'} flexDirection={'column'} gap={'6px'} mb={'16px'}>
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'12px'}
                cursor={'pointer'}
                onClick={() => navigate('/cart')}
              >
                <Icon as={ArrowLeftIcon} fontSize={'22px'} />
                <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
                  Checkout
                </Text>
              </Box>
            </Box>
            {/* body */}
            <Box display={'flex'} gap={'16px'}>
              <Box
                w={{ xl: '1100px', '2xl': '1420px' }}
                display={'flex'}
                flexDirection={'column'}
                gap={'24px'}
              >
                {/* delivery address */}
                <DeliveryAddress
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                  nearestWarehouse={nearestWarehouse}
                  setNearestWarehouse={setNearestWarehouse}
                  shippingCost={shippingCost}
                  setShippingCost={setShippingCost}
                />
                {/* Product Display */}
                <Box
                  bgColor={'white'}
                  w={'full'}
                  h={'fit-content'}
                  borderRadius={'16px'}
                  padding={'4px'}
                >
                  {/* Desktop Version */}
                  <OrderBodyDesktop orderItem={orderItem} />
                  {/* Mobile Version */}
                  <OrderBodyMobile orderItem={orderItem} />
                </Box>
              </Box>
              {/* Shopping Summary - Desktop Version */}
              {shippingCost && (
                <ShoppingSummaryDesktop
                  shippingCost={shippingCost}
                  totalQuantity={totalQuantity}
                  totalPrice={totalPrice}
                  handlePaymentClick={() => handlePaymentClick(orderItem)}
                />
              )}
            </Box>
          </Box>
          {/* Shopping Summary - Mobile Version */}
          {shippingCost && (
            <ShoppingSummaryMobile
              shippingCost={shippingCost}
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
              handlePaymentClick={() => handlePaymentClick(orderItem)}
            />
          )}
        </Box>
      ))}
    </Box>
  )
}

export default OrderBody

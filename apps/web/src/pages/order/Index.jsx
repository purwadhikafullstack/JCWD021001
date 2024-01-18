import React from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import { CreateOrder } from './services/CreateOrder'
import { CreatePayment } from './services/CreatePayment'
import Navbar from '../../components/Navbar/Navbar'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import OrderBody from '../../components/order'
import { getOrder } from './services/getOrder'
import { useState, useEffect } from 'react'

const Order = () => {
  const handleCheckout = async () => {
    try {
      const midtransToken = await CreateOrder()

      if (midtransToken) {
        const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js'
        const clientKey = import.meta.env.MIDTRANS_CLIENT_KEY
        const script = document.createElement('script')
        script.src = snapScript
        script.setAttribute('data-client-key', clientKey)
        // script.async = true;

        script.onload = () => {
          window.snap.pay(midtransToken, {
            onSuccess: function (result) {
              /* You may add your own implementation here */
              alert('payment success!')
              console.log(result)
              CreatePayment(result)
            },
            onPending: function (result) {
              /* You may add your own implementation here */
              alert('wating your payment!')
              console.log(result)
            },
            onError: function (result) {
              /* You may add your own implementation here */
              alert('payment failed!')
              console.log(result)
            },
            onClose: function () {
              /* You may add your own implementation here */
              alert('you closed the popup without finishing the payment')
            },
          })
        }
        document.body.appendChild(script)
      } else {
        console.error('Failed to get Midtrans token')
      }
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  const [orderData, setOrderData] = useState([])
  console.log('order', orderData)

  const refreshOrder = async () => {
    try {
      const data = await getOrder()
      setOrderData(data)
    } catch (error) {
      console.error('Error fetching cart data:', error)
    }
  }

  useEffect(() => {
    refreshOrder()
  }, [])

  return (
    // <Box>
    //     <Button colorScheme='blue' onClick={handleCheckout}>Checkout</Button>
    // </Box>
    <>
      {/* <Navbar /> */}
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <OrderBody orderData={orderData}/>
        {/* <Box padding={{ base: '24px 24px 280px 24px', xl: '24px' }}>
          <Box display={'flex'} flexDirection={'column'} gap={'6px'} mb={'16px'}>
            <Box display={'flex'} alignItems={'center'} gap={'12px'}>
              <Icon as={ArrowLeftIcon} fontSize={'22px'} />
              <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
                Checkout
              </Text>
            </Box>
            <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
              Order Id
            </Text>
          </Box>
          <OrderBody orderData={orderData} />
        </Box>
        <Box
          bgColor={'white'}
          w={'full'}
          h={'fit-content'}
          padding={'16px'}
          display={{ base: 'flex', xl: 'none' }}
          flexDirection={'column'}
          gap={'12px'}
          position={'fixed'}
          bottom={'0'}
        >
          <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
            Shopping Summary
          </Text>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
              Total Price (8 Items)
            </Text>
            <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
              Rp 400.000
            </Text>
          </Box>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
              Shipping Price
            </Text>
            <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
              Rp 22.000
            </Text>
          </Box>
          <Box w={'full'} h={'2px'} bgColor={'#F1F1F1'} />
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={'16px'}>
            <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
              Total Price
            </Text>
            <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'} color={'#CD0244'}>
              Rp 422.000
            </Text>
          </Box>
          <Button bgColor={'#CD0244'} color={'#ffffff'}>
            Process to Payment
          </Button>
        </Box> */}
      </Box>
    </>
  )
}

export default Order

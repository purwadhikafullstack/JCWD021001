import React from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { paymentGateway } from '../../pages/order/services/paymentGateway'
import { CreatePayment } from '../../pages/order/services/CreatePayment'
import { createOrder } from '../../pages/order/services/createOrder'
import { useNavigate } from 'react-router-dom'


const OrderBody = ({ orderData }) => {
  // console.log('orderdata', orderData);
  const navigate = useNavigate()
  const handlePayment = async (order) => {
    try {
      const dataOrder = {
        userId: order?.User?.id,
        userAddressId: 1,
        warehouseId: 1,
        totalPrice: parseFloat(order?.totalPrice),
        totalQuantity: order?.totalQuantity,
        shippingCost: 20000,
        orderStatusId: 1,
        products: order.CartProducts.map((product) => ({
          stockId: product?.stocks?.id,
          productId: product?.stocks?.products?.id,
          quantity: product?.quantity,
          price: parseFloat(product?.price),
          priceProduct: product?.stocks?.products?.price,
          
        })),
      }
    
      const result = await createOrder(dataOrder);
      // console.log('asdasda', result);
      const midtransToken = result?.midtransToken;
      const orderId = result?.order?.id;

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
              CreatePayment(result, orderId)
              navigate('/order-list', { state: { refresh: true, activeTab: 1 } });
            },
            onPending: function (result) {
              /* You may add your own implementation here */
              alert('wating your payment!')
              CreatePayment(result, orderId)
              navigate('/order-list', { state: { refresh: true, activeTab: 0 } });
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
  return (
    <Box>
      {orderData.map((orderItem) => (
        <Box key={orderItem.id}>
          {/* {console.log('cartData', cartItem)} */}
          <Box padding={{ base: '24px 24px 280px 24px', xl: '24px' }}>
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
            {/* <OrderBody orderData={orderData} /> */}
            <Box display={'flex'} gap={'16px'}>
              <Box
                w={{ xl: '1100px', '2xl': '1420px' }}
                display={'flex'}
                flexDirection={'column'}
                gap={'24px'}
              >
                <Box
                  bgColor={'white'}
                  w={'full'}
                  h={'fit-content'}
                  padding={'24px'}
                  borderRadius={'16px'}
                  display={'flex'}
                  flexDirection={'column'}
                  gap={'24px'}
                >
                  <Box display={'flex'} alignItems={'center'} gap={'8px'}>
                    <Icon as={MapPinIcon} fontSize={'22px'} color={'#CD0244'} />
                    <Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>
                      Delivery Address
                    </Text>
                  </Box>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={'16px'}
                    padding={'24px'}
                    border={'1px solid #818181'}
                    borderRadius={'12px'}
                  >
                    <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
                      Xavier Steven Domanique
                    </Text>
                    <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                      <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
                        081123123123
                      </Text>
                      <Text
                        fontFamily={'body'}
                        fontWeight={'400'}
                        fontSize={'16px'}
                        color={'#6F6F6F'}
                      >
                        Jl. Suryodiningratan No. 37B, Suryodiningratan, Kec. Mantrijeron, Kota
                        Yogyakarta, Daerah Istimewa Yogyakarta 55141, Indonesia
                      </Text>
                    </Box>
                  </Box>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                    <Box
                      w={'168px'}
                      h={'43px'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      border={'1px solid #818181'}
                      borderRadius={'8px'}
                    >
                      <Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>
                        Change Address
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Box
                  bgColor={'white'}
                  w={'full'}
                  h={'fit-content'}
                  borderRadius={'16px'}
                  padding={'4px'}
                >
                  <Box
                    display={{ base: 'flex', xl: 'none' }}
                    flexDirection={'column'}
                    gap={'16px'}
                    w={'full'}
                    h={'fit-content'}
                    padding={'18px'}
                  >
                    <Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>
                      Products Ordered
                    </Text>
                    <Box display={'flex'} flexDirection={'column'} gap={'24px'}>
                      {orderItem?.CartProducts?.map((item) => (
                        <Box key={item.id} w={'full'} display={'flex'} gap={'16px'}>
                          <Box w={'64px'} h={'64px'} bgColor={'brand.grey100'} />
                          <Box display={'flex'} flexDirection={'column'} w={'full'}>
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                              {item?.stocks?.products?.name}
                            </Text>
                            <Text
                              fontFamily={'body'}
                              fontWeight={'400'}
                              fontSize={'14px'}
                              color={'#838383'}
                            >
                              S, Dark Blue
                            </Text>
                            <Box
                              display={'flex'}
                              alignItems={'center'}
                              justifyContent={'space-between'}
                            >
                              <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                                {item?.quantity} x Rp {item?.stocks?.product?.price}
                              </Text>
                              <Text
                                fontFamily={'body'}
                                fontWeight={'600'}
                                fontSize={'14px'}
                                color={'#CD0244'}
                              >
                                Rp {item?.price}
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <TableContainer display={{ base: 'none', xl: 'block' }}>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Td>Products Ordered</Td>
                          <Td>Size</Td>
                          <Td>Color</Td>
                          <Td>Quantity</Td>
                          <Td>Total Price</Td>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {orderItem?.CartProducts?.map((item) => (
                          <Tr key={item.id}>
                            <Td>
                              <Box w={'400px'} display={'flex'} gap={'16px'}>
                                <Box minW={'64px'} h={'64px'} bgColor={'brand.grey100'} />
                                <Box
                                  w={'400px'}
                                  overflow={'hidden'}
                                  display={'flex'}
                                  flexDirection={'column'}
                                  gap={'10px'}
                                >
                                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                                    {item?.stocks?.products?.name}
                                  </Text>
                                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                                    Rp {item?.stocks?.products?.price}
                                  </Text>
                                </Box>
                              </Box>
                            </Td>
                            <Td>
                              <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                                L
                              </Text>
                            </Td>
                            <Td>
                              <Box display={'flex'} alignItems={'center'} gap={'16px'}>
                                <Box
                                  w={'36px'}
                                  h={'36px'}
                                  bgColor={'#2F4E7A'}
                                  borderRadius={'6px'}
                                />
                                <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                                  Dark Blue
                                </Text>
                              </Box>
                            </Td>
                            <Td>
                              <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                                {item?.quantity}
                              </Text>
                            </Td>
                            <Td>
                              <Text
                                fontFamily={'body'}
                                fontWeight={'600'}
                                fontSize={'16px'}
                                color={'#CD0244'}
                              >
                                Rp {item?.price}
                              </Text>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
              <Box
                bgColor={'white'}
                w={{ xl: '334px', '2xl': '430px' }}
                h={'fit-content'}
                padding={'16px'}
                display={{ base: 'none', xl: 'flex' }}
                flexDirection={'column'}
                gap={'12px'}
                borderRadius={'12px'}
              >
                <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
                  Shopping Summary
                </Text>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
                    Total Price ({orderItem?.totalQuantity} Items)
                  </Text>
                  <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
                    Rp {orderItem?.totalPrice}
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
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  mb={'16px'}
                >
                  <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
                    Total Price
                  </Text>
                  <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'} color={'#CD0244'}>
                    Rp {orderItem?.totalPrice}
                  </Text>
                </Box>
                <Button
                  bgColor={'#CD0244'}
                  color={'#ffffff'}
                  onClick={() => handlePayment(orderItem)}
                >
                  Process to Payment
                </Button>
              </Box>
            </Box>
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
                Rp {orderItem?.totalPrice}
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
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              mb={'16px'}
            >
              <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
                Total Price
              </Text>
              <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'} color={'#CD0244'}>
                Rp {orderItem?.totalPrice}
              </Text>
            </Box>
            <Button bgColor={'#CD0244'} color={'#ffffff'}>
              Process to Payment
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default OrderBody

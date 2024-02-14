import React from 'react'
import { Box, Text, Icon, Image } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Td, TableContainer } from '@chakra-ui/react'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import toRupiah from '@develoka/angka-rupiah-js'
import { useNavigate } from 'react-router-dom'
import { IMAGE_API_ROUTE } from '../../services/route'

const OrderDetailsBody = ({ orderData }) => {
  const navigate = useNavigate()
  return (
    <Box>
      {orderData ? (
        <Box key={orderData.id}>
          <Box padding={{ base: '24px 24px 280px 24px', xl: '24px' }}>
            <Box display={'flex'} flexDirection={'column'} gap={'6px'} mb={'16px'}>
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'12px'}
                cursor={'pointer'}
                onClick={() =>
                  navigate('/order-list', { state: { refresh: true, activeTab: 0, status: [1] } })
                }
              >
                <Icon as={ArrowLeftIcon} fontSize={'22px'} />
                <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
                  Detail Transactions
                </Text>
              </Box>
            </Box>
            <Box display={'flex'} gap={'16px'}>
              <Box
                w={{ base: 'full', xl: '1100px', '2xl': '1420px' }}
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
                      {orderData?.User?.username}
                    </Text>
                    <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                      <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
                        {orderData?.User?.email}
                      </Text>
                      <Text
                        fontFamily={'body'}
                        fontWeight={'400'}
                        fontSize={'16px'}
                        color={'#6F6F6F'}
                      >
                        {orderData?.UserAddress?.spesificAddress}
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
                      {orderData?.OrderProducts?.map((item) => (
                        <Box key={item.id} w={'full'} display={'flex'} gap={'16px'}>
                          <Box w={'64px'} h={'64px'} bgColor={'brand.grey100'}>
                            <Image
                              src={`${IMAGE_API_ROUTE}/productImages/${item?.stocks?.product?.picture[0]?.imageUrl}`}
                            />
                          </Box>
                          <Box display={'flex'} flexDirection={'column'} w={'full'}>
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                              {item?.stocks?.product?.name}
                            </Text>
                            <Text
                              fontFamily={'body'}
                              fontWeight={'400'}
                              fontSize={'14px'}
                              color={'#838383'}
                            >
                              {item?.stocks?.size?.name}, {item?.stocks?.colour?.name}
                            </Text>
                            <Box
                              display={'flex'}
                              alignItems={'center'}
                              justifyContent={'space-between'}
                            >
                              <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                                {item?.quantity} x{' '}
                                {toRupiah(+item?.stocks?.product?.price, { floatingPoint: 0 })}
                              </Text>
                              <Text
                                fontFamily={'body'}
                                fontWeight={'600'}
                                fontSize={'14px'}
                                color={'#CD0244'}
                              >
                                {toRupiah(+item?.price, { floatingPoint: 0 })}
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
                          <Td>
                            <Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>
                              Products Ordered
                            </Text>
                          </Td>
                          <Td>
                            <Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>
                              Size
                            </Text>
                          </Td>
                          <Td>
                            <Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>
                              Color
                            </Text>
                          </Td>
                          <Td>
                            <Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>
                              Quantity
                            </Text>
                          </Td>
                          <Td>
                            <Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>
                              Total Price
                            </Text>
                          </Td>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {orderData?.OrderProducts?.map((item) => (
                          <Tr key={item.id}>
                            <Td>
                              <Box w={'400px'} display={'flex'} gap={'16px'}>
                                <Box maxW={'64px'} h={'64px'} bgColor={'brand.grey100'}>
                                  <Image
                                    src={`${IMAGE_API_ROUTE}/productImages/${item?.stocks?.product?.picture[0]?.imageUrl}`}
                                  />
                                </Box>
                                <Box
                                  w={'400px'}
                                  overflow={'hidden'}
                                  display={'flex'}
                                  flexDirection={'column'}
                                  gap={'10px'}
                                >
                                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                                    {item?.stocks?.product?.name}
                                  </Text>
                                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                                    {toRupiah(+item?.stocks?.product?.price, { floatingPoint: 0 })}
                                  </Text>
                                </Box>
                              </Box>
                            </Td>
                            <Td>
                              <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                                {item?.stocks?.size?.name}
                              </Text>
                            </Td>
                            <Td>
                              <Box display={'flex'} alignItems={'center'} gap={'16px'}>
                                <Box
                                  w={'36px'}
                                  h={'36px'}
                                  bgColor={item?.stocks?.colour?.name}
                                  borderRadius={'6px'}
                                  border={'1px'}
                                />
                                <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                                  {item?.stocks?.colour?.name}
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
                                {toRupiah(+item?.price, { floatingPoint: 0 })}
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
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
                    Invoice
                  </Text>
                  <Icon as={ArrowDownTrayIcon} boxSize={'24px'} />
                </Box>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
                    Payment Method
                  </Text>
                  <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
                    {orderData?.Payment?.paymentMethod}
                  </Text>
                </Box>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
                    Total Price ({orderData?.totalQuantity} Items)
                  </Text>
                  <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
                    {toRupiah(+orderData?.totalPrice, { floatingPoint: 0 })}
                  </Text>
                </Box>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
                    Shipping Price
                  </Text>
                  <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
                    {toRupiah(+orderData?.shippingCost, { floatingPoint: 0 })}
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
                    {toRupiah(+orderData?.totalPrice + +orderData?.shippingCost, {
                      floatingPoint: 0,
                    })}
                  </Text>
                </Box>
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
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
                Invoice
              </Text>
              <Icon as={ArrowDownTrayIcon} boxSize={'24px'} />
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
                Payment Method
              </Text>
              <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
                {orderData?.Payment?.paymentMethod}
              </Text>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
                Total Price ({orderData?.totalQuantity} Items)
              </Text>
              <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
                {toRupiah(+orderData?.totalPrice, { floatingPoint: 0 })}
              </Text>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
                Shipping Price
              </Text>
              <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
                {toRupiah(+orderData?.shippingCost, { floatingPoint: 0 })}
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
                {toRupiah(+orderData?.totalPrice + +orderData?.shippingCost, {
                  floatingPoint: 0,
                })}
              </Text>
            </Box>
          </Box>
        </Box>
      ) : (
        <Text>No order data available</Text>
      )}
    </Box>
  )
}

export default OrderDetailsBody

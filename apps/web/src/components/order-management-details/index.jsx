import React from 'react'
import { Box, Text, Icon, Image } from '@chakra-ui/react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Td, TableContainer } from '@chakra-ui/react'
import { HomeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@chakra-ui/icons'
import toRupiah from '@develoka/angka-rupiah-js'
import { useNavigate } from 'react-router-dom'
import { IMAGE_API_ROUTE } from '../../services/route'

const OrderManagementDetailBody = ({ orderData }) => {
  const navigate = useNavigate()
  return (
    <Box>
      {orderData ? (
        <Box key={orderData.id} display={'flex'}>
          <Box w={{ base: 'full', xl: '85vw' }} minH={'100vh'} padding={'24px'}>
            <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
                  Order Management
                </Text>
              </Box>
              <Breadcrumb spacing="8px" separator={<ChevronRightIcon color={'#838383'} />}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Icon as={HomeIcon} color={'#838383'} strokeWidth={2} boxSize={'18px'} />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() => {
                      navigate('/dashboard/order-management', {
                        state: { refresh: true, activeTab: 0, status: [2] },
                      })
                    }}
                  >
                    <Text
                      fontFamily={'heading'}
                      fontWeight={'700'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      Order Management
                    </Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#">
                    <Text
                      fontFamily={'heading'}
                      fontWeight={'700'}
                      fontSize={'14px'}
                      color={'#CD0244'}
                    >
                      New Order
                    </Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Box>
                <Text fontFamily={'body'} fontWeight={'400'} fontSize={'14px'} color={'#838383'}>
                  No. Order {orderData?.orderNumber}
                </Text>
              </Box>
              <Box>
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
          </Box>
        </Box>
      ) : (
        <Text>No order data available</Text>
      )}
    </Box>
  )
}
export default OrderManagementDetailBody

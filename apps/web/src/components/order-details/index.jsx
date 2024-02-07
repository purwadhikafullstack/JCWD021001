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
import { ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

const OrderDetailsBody = () => {
  return (
    <Box>
      <Box>
        {/* {console.log('cartData', cartItem)} */}
        <Box padding={{ base: '24px 24px 280px 24px', xl: '24px' }}>
          <Box display={'flex'} flexDirection={'column'} gap={'6px'} mb={'16px'}>
            <Box display={'flex'} alignItems={'center'} gap={'12px'}>
              <Icon as={ArrowLeftIcon} fontSize={'22px'} />
              <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
                Detail Transactions
              </Text>
            </Box>
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
                    <Box w={'full'} display={'flex'} gap={'16px'}>
                      <Box w={'64px'} h={'64px'} bgColor={'brand.grey100'} />
                      <Box display={'flex'} flexDirection={'column'} w={'full'}>
                        <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                          sfffd
                        </Text>
                        <Text
                          fontFamily={'body'}
                          fontWeight={'400'}
                          fontSize={'14px'}
                          color={'#838383'}
                        >
                          sfsdf, sfsdfd
                        </Text>
                        <Box
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'space-between'}
                        >
                          <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                            fdasff x Rp sfsdfdf
                          </Text>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'600'}
                            fontSize={'14px'}
                            color={'#CD0244'}
                          >
                            Rp fdfdf
                          </Text>
                        </Box>
                      </Box>
                    </Box>
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
                      <Tr>
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
                                sfsfdsf
                              </Text>
                              <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                                Rp sdfdsfds
                              </Text>
                            </Box>
                          </Box>
                        </Td>
                        <Td>
                          <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                            sdfdsfdsf
                          </Text>
                        </Td>
                        <Td>
                          <Box display={'flex'} alignItems={'center'} gap={'16px'}>
                            <Box w={'36px'} h={'36px'} bgColor={'#2F4E7A'} borderRadius={'6px'} />
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                              sdfsdf
                            </Text>
                          </Box>
                        </Td>
                        <Td>
                          <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                            sfdsfd
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'600'}
                            fontSize={'16px'}
                            color={'#CD0244'}
                          >
                            Rp dfsdf
                          </Text>
                        </Td>
                      </Tr>
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
                  Gopay
                </Text>
              </Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
                  Total Price (5 Items)
                </Text>
                <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
                  Rp fdsf
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
                  Rp sdfsdf
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
              Gopay
            </Text>
          </Box>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
              Total Price (6 Items)
            </Text>
            <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
              Rp fsdf
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
              Rp sfsdf
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default OrderDetailsBody

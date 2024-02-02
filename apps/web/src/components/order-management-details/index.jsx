import React, { useEffect, useState } from 'react'
import { Box, Text, Button, ButtonGroup, Icon, Input, Collapse, Select } from '@chakra-ui/react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react'
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
import {
  HomeIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@chakra-ui/icons'
const OrderManagementDetailBody = () => {
  return (
    <Box display={'flex'}>
      <Box w={{ base: 'none', xl: '15vw' }} minH={'100vh'} bgColor={'white'}></Box>
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
                <Icon as={HomeIcon} color={'#838383'} strokeWidth={2} boxSize={'18px'}/>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'14px'} color={'#838383'}>
                  Order Management
                </Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">
                <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'14px'} color={'#CD0244'}>
                  New Order
                </Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box>
            <Text>No. Order</Text>
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
                  Xavier Steven Domanique
                </Text>
                <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                  <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
                    081123123123
                  </Text>
                  <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#6F6F6F'}>
                    Jl. Suryodiningratan No. 37B, Suryodiningratan, Kec. Mantrijeron, Kota
                    Yogyakarta, Daerah Istimewa Yogyakarta 55141, Indonesia
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box bgColor={'white'} w={'full'} h={'fit-content'} borderRadius={'16px'} padding={'4px'}>
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
                      ssdfdsf
                    </Text>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'400'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      sdfdfd, sdfdsf
                    </Text>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                      <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                        sdfdf x Rp dsfdsfd
                      </Text>
                      <Text
                        fontFamily={'body'}
                        fontWeight={'600'}
                        fontSize={'14px'}
                        color={'#CD0244'}
                      >
                        Rp dsfdfds
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
                    <Td><Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>Products Ordered</Text></Td>
                    <Td><Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>Size</Text></Td>
                    <Td><Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>Color</Text></Td>
                    <Td><Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>Quantity</Text></Td>
                    <Td><Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>Total Price</Text></Td>
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
                            dfdfd
                          </Text>
                          <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                            Rp dfdsfds
                          </Text>
                        </Box>
                      </Box>
                    </Td>
                    <Td>
                      <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                        dsfdsf
                      </Text>
                    </Td>
                    <Td>
                      <Box display={'flex'} alignItems={'center'} gap={'16px'}>
                        <Box w={'36px'} h={'36px'} bgColor={'#2F4E7A'} borderRadius={'6px'} />
                        <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                          fdfdsf
                        </Text>
                      </Box>
                    </Td>
                    <Td>
                      <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                        dsfsdfd
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        fontFamily={'body'}
                        fontWeight={'600'}
                        fontSize={'16px'}
                        color={'#CD0244'}
                      >
                        Rp dsfdsfdsf
                      </Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default OrderManagementDetailBody

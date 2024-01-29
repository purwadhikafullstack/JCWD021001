import React, { useEffect, useState } from 'react'
import { Box, Text, Button, ButtonGroup, Icon, Input } from '@chakra-ui/react'
import { HomeIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
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
import { Select } from '@chakra-ui/react'

const OrderManagementBody = () => {
  const data = [
    {
      name: 'Product A',
      quantity: 2,
      price: 20,
      product: 'lala',
      warehouse: '1',
      status: 'success',
    },
    {
      name: 'Product A',
      quantity: 2,
      price: 20,
      product: 'lala',
      warehouse: '1',
      status: 'success',
    },
    {
      name: 'Product A',
      quantity: 2,
      price: 20,
      product: 'lala',
      warehouse: '1',
      status: 'success',
    },
    // Add more dummy data as needed
  ]
  return (
    <Box display={'flex'}>
      <Box w={{ base: 'none', xl: '15vw' }} minH={'100vh'} bgColor={'white'}></Box>
      <Box w={{ base: 'full', xl: '85vw' }} minH={'100vh'} padding={'24px'}>
        <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
              Order Management
            </Text>
            <Box display={{ base: 'none', xl: 'flex' }} alignItems={'center'} gap={'16px'}>
              <Box
                bgColor={'white'}
                w={'375px'}
                display={'flex'}
                alignItems={'center'}
                padding={'4px 12px 4px 8px'}
                borderRadius={'8px'}
              >
                <Input border={'none'} placeholder="Search here...." />
                <Icon as={MagnifyingGlassIcon} />
              </Box>
              <Box bgColor={'white'} w={'171px'} padding={'4px 12px 4px 8px'} borderRadius={'8px'}>
                <Select placeholder="Select option" border={'none'}>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </Box>
            </Box>
          </Box>
          <Breadcrumb spacing="8px" separator={<ChevronRightIcon />}>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="#"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Icon as={HomeIcon} />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">
                <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'14px'} color={'#CD0244'}>
                  Order Management
                </Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box display={{ base: 'flex', xl: 'none' }} alignItems={'center'} gap={'16px'}>
            <Box
              bgColor={'white'}
              w={'375px'}
              display={'flex'}
              alignItems={'center'}
              padding={'4px 12px 4px 8px'}
              borderRadius={'8px'}
            >
              <Input border={'none'} placeholder="Search here...." />
              <Icon as={MagnifyingGlassIcon} />
            </Box>
            <Box bgColor={'white'} w={'171px'} padding={'4px 12px 4px 8px'} borderRadius={'8px'}>
              <Select placeholder="Select option" border={'none'}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Box>
          </Box>
          <Tabs>
            <TabList
              display="flex"
              flexDirection="row"
              overflowX="auto"
              css={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              <Tab
                fontFamily={'heading'}
                fontWeight={'600'}
                fontSize={'16px'}
                color={'#838383'}
                _selected={{
                  color: '#CD0244',
                  borderColor: '#CD0244',
                  // bg: '#FED7E2',
                }}
              >
                New Order
              </Tab>
              <Tab
                fontFamily={'heading'}
                fontWeight={'600'}
                fontSize={'16px'}
                color={'#838383'}
                _selected={{
                  color: '#CD0244',
                  borderColor: '#CD0244',
                  // bg: '#FED7E2',
                }}
              >
                On Process
              </Tab>
              <Tab
                fontFamily={'heading'}
                fontWeight={'600'}
                fontSize={'16px'}
                color={'#838383'}
                _selected={{
                  color: '#CD0244',
                  borderColor: '#CD0244',
                  // bg: '#FED7E2',
                }}
              >
                On Delivery
              </Tab>
              <Tab
                fontFamily={'heading'}
                fontWeight={'600'}
                fontSize={'16px'}
                color={'#838383'}
                _selected={{
                  color: '#CD0244',
                  borderColor: '#CD0244',
                  // bg: '#FED7E2',
                }}
              >
                Order Confirmed
              </Tab>
              <Tab
                fontFamily={'heading'}
                fontWeight={'600'}
                fontSize={'16px'}
                color={'#838383'}
                _selected={{
                  color: '#CD0244',
                  borderColor: '#CD0244',
                  // bg: '#FED7E2',
                }}
              >
                Order Cancelled
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel padding={{ base: '16px 0 16px 0', xl: '16px' }}>
                <Box display={{base: 'block', xl: 'none'}} w={'full'} h={'fit-content'} bgColor={'white'} borderRadius={'12px'} padding={'16px'}>
                  <Box display={'flex'} flexDirection={'column'} gap={'12px'}>
                    <Box
                      display={'flex'}
                      alignItems={{ base: 'normal', xl: 'center' }}
                      justifyContent={'space-between'}
                    >
                      <Box
                        display={'flex'}
                        alignItems={{ base: 'normal', xl: 'center' }}
                        gap={'12px'}
                        flexDirection={{ base: 'column', xl: 'row' }}
                      >
                        <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                          13 December 2023, 23:10:00
                        </Text>
                        <Box display={'flex'} alignItems={'center'} gap={'12px'}>
                          <Box bgColor={'#E8E7E7'} minW={'8px'} h={'8px'} borderRadius={'50%'} />
                          <Text
                            color={'#838383'}
                            fontFamily={'body'}
                            fontWeight={'600'}
                            fontSize={'14px'}
                          >
                            No. Order #123456789
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        bgColor={'#FFF1F5'}
                        w={'130px'}
                        h={'38px'}
                        display={{ base: 'none', xl: 'flex' }}
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRadius={'8px'}
                      >
                        <Text
                          color={'#CD0244'}
                          fontFamily={'body'}
                          fontWeight={'600'}
                          fontSize={'14px'}
                        >
                          New Order
                        </Text>
                      </Box>
                    </Box>
                    <Box
                      display={'flex'}
                      alignItems={{ base: 'normal', xl: 'flex-end' }}
                      justifyContent={'space-between'}
                      flexDirection={{ base: 'column', xl: 'row' }}
                    >
                      <Box
                        className="product"
                        display={'flex'}
                        gap={'16px'}
                        flexDirection={{ base: 'column', xl: 'row' }}
                      >
                        <Box display={'flex'} gap={'16px'}>
                          <Box bgColor={'brand.grey100'} w={'112px'} h={'112px'}></Box>
                          <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                              Long Sleeve Bodysuit 1 Pack (Stripe)
                            </Text>
                            <Text
                              fontFamily={'body'}
                              fontWeight={'600'}
                              fontSize={'14px'}
                              color={'#838383'}
                            >
                              S, Dark Blue
                            </Text>
                            <Text
                              fontFamily={'body'}
                              fontWeight={'600'}
                              fontSize={'14px'}
                              color={'#838383'}
                            >
                              1 item x Rp 200.000
                            </Text>
                            <Box>
                              <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                                + 2 more products
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        className="price"
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'flex-end'}
                      >
                        <Text
                          fontFamily={'body'}
                          fontWeight={'600'}
                          fontSize={'14px'}
                          color={'#838383'}
                        >
                          Total Price
                        </Text>
                        <Text
                          fontFamily={'body'}
                          fontWeight={'700'}
                          fontSize={'16px'}
                          color={'#CD0244'}
                        >
                          Rp 210.000
                        </Text>
                      </Box>
                    </Box>
                    <Box w={'full'} display={'flex'} justifyContent={'flex-end'} gap={'16px'}>
                      <Button bgColor={'white'} color={'#CD0244'} border={'1px solid #CD0244'}>
                        Reject
                      </Button>
                      <Button
                        bgColor={'#CD0244'}
                        color={'white'}
                        // onClick={() => handlePayNowClick(order.id)}
                      >
                        Accept
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <TableContainer display={{ base: 'none', xl: 'block' }} borderRadius={'8px'}>
                  <Table>
                    <Thead bgColor={'#CD0244'}>
                      <Tr>
                        <Td>
                          <Text color={'white'}>Time Transaction</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Warehouse Name</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Customer’s Name</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Product</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Total Price</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Status Payment</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Action</Text>
                        </Td>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.map((row, index) => (
                        <Tr
                          key={index}
                          bg={index % 2 === 0 ? '#FFF1F5' : 'white'}
                          // _hover={{ bg: '#FED7E2' }}
                        >
                          <Td>{row.name}</Td>
                          <Td>{row.quantity}</Td>
                          <Td>{row.price}</Td>
                          <Td>
                            <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                              <Box display={'flex'} gap={'8px'}>
                                <Box w={'66px'} h={'66px'} bgColor={'#D9D9D9'} />
                                <Box>
                                  <Text>GIRLS Denim Jumper Skirt</Text>
                                  <Text>ID Product : 123456789</Text>
                                </Box>
                              </Box>
                              <Box display={'flex'} alignItems={'center'} gap={'6px'}>
                                <Text>Show More</Text>
                                <Icon as={ChevronDownIcon} />
                              </Box>
                            </Box>
                          </Td>
                          <Td>{row.name}</Td>
                          <Td>
                            <Text>Settlement</Text>
                          </Td>
                          <Td>
                            <Box display={'flex'} gap={'8px'}>
                              <Button size={'sm'} bgColor={'#CD0244'} color={'white'}>
                                Accept
                              </Button>
                              <Button size={'sm'} border={'1px solid #CD0244'} color={'#CD0244'}>
                                Reject
                              </Button>
                            </Box>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <TableContainer borderRadius={'8px'}>
                  <Table>
                    <Thead bgColor={'#CD0244'}>
                      <Tr>
                        <Td>
                          <Text color={'white'}>Time Transaction</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Warehouse Name</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Customer’s Name</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Product</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Total Price</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Status Payment</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Action</Text>
                        </Td>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.map((row, index) => (
                        <Tr
                          key={index}
                          bg={index % 2 === 0 ? '#FFF1F5' : 'white'}
                          // _hover={{ bg: '#FED7E2' }}
                        >
                          <Td>{row.name}</Td>
                          <Td>{row.quantity}</Td>
                          <Td>{row.price}</Td>
                          <Td>
                            <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                              <Box display={'flex'} gap={'8px'}>
                                <Box w={'66px'} h={'66px'} bgColor={'#D9D9D9'} />
                                <Box>
                                  <Text>GIRLS Denim Jumper Skirt</Text>
                                  <Text>ID Product : 123456789</Text>
                                </Box>
                              </Box>
                              <Box display={'flex'} alignItems={'center'} gap={'6px'}>
                                <Text>Show More</Text>
                                <Icon as={ChevronDownIcon} />
                              </Box>
                            </Box>
                          </Td>
                          <Td>{row.name}</Td>
                          <Td>
                            <Text>Settlement</Text>
                          </Td>
                          <Td>
                            <Button size={'sm'} bgColor={'#CD0244'} color={'white'}>
                              Submit
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <TableContainer borderRadius={'8px'}>
                  <Table>
                    <Thead bgColor={'#CD0244'}>
                      <Tr>
                        <Td>
                          <Text color={'white'}>Time Transaction</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Warehouse Name</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Customer’s Name</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Product</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Total Price</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Status Payment</Text>
                        </Td>
                        <Td>
                          <Text color={'white'}>Action</Text>
                        </Td>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.map((row, index) => (
                        <Tr
                          key={index}
                          bg={index % 2 === 0 ? '#FFF1F5' : 'white'}
                          // _hover={{ bg: '#FED7E2' }}
                        >
                          <Td>{row.name}</Td>
                          <Td>{row.quantity}</Td>
                          <Td>{row.price}</Td>
                          <Td>
                            <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                              <Box display={'flex'} gap={'8px'}>
                                <Box w={'66px'} h={'66px'} bgColor={'#D9D9D9'} />
                                <Box>
                                  <Text>GIRLS Denim Jumper Skirt</Text>
                                  <Text>ID Product : 123456789</Text>
                                </Box>
                              </Box>
                              <Box display={'flex'} alignItems={'center'} gap={'6px'}>
                                <Text>Show More</Text>
                                <Icon as={ChevronDownIcon} />
                              </Box>
                            </Box>
                          </Td>
                          <Td>{row.name}</Td>
                          <Td>
                            <Text>Settlement</Text>
                          </Td>
                          <Td>
                            <Button size={'sm'} border={'1px solid #CD0244'} color={'#CD0244'}>
                              See Details
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  )
}
export default OrderManagementBody

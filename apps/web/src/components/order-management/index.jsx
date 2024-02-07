import React, { useEffect, useState } from 'react'
import { Box, Text, Button, ButtonGroup, Icon, Input, Collapse } from '@chakra-ui/react'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
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
  useBreakpointValue,
} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { createStockJournal } from '../../pages/dashboard/components/stock-management/services/createStocks'
import { useToast } from '@chakra-ui/react'
import { updateOrder } from '../../pages/order/services/updateOrder'
import { useNavigate } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import OrderManagementTable from './order-management-table'

const OrderManagementBody = ({
  orderData,
  warehouseData,
  onOrderNumberSubmit,
  onOrderDateSubmit,
  onWarehouseSubmit
}) => {
  const [sortedOrderData, setSortedOrderData] = useState([])
  const [orderNumber, setOrderNumber] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  const toast = useToast()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (orderData && orderData.length > 0 && orderData[0].orderDate) {
      // Sort orderData based on the orderDate in descending order
      const sortedData = [...orderData].sort((a, b) => {
        const dateA = new Date(a.orderDate).getTime()
        const dateB = new Date(b.orderDate).getTime()
        return dateB - dateA
      })
      // Update sortedOrderData with the sorted data
      setSortedOrderData(sortedData)
    } else {
      // If orderData is empty or doesn't have valid data, set sortedOrderData to an empty array
      setSortedOrderData([])
    }
  }, [orderData])

  const newOrder = sortedOrderData?.filter(
    (order) => order?.OrderStatus?.name === 'Waiting Confirmed',
  )
  const onProcess = sortedOrderData?.filter((order) => order?.OrderStatus?.name === 'On Process')
  // console.log('newOrder', newOrder)

  const [expandedProducts, setExpandedProducts] = useState({})

  const handleToggleProducts = (orderId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  const handleAcceptButton = async (orderId) => {
    try {
      // Find the corresponding order based on orderId
      const clickedItem = newOrder.find((order) => order.id === orderId)

      if (clickedItem) {
        // Map OrderProducts to an array of parameters
        const orderProducts = clickedItem.OrderProducts.map((product) => ({
          productId: product?.stocks?.product?.id,
          warehouseId: clickedItem?.warehouse?.id,
          sizeId: product?.stocks?.size?.id,
          colourId: product?.stocks?.colour?.id,
          qty: product?.quantity,
          isUpdate: false,
        }))

        // Loop through orderProducts and call createStockJournal for each
        for (const productParams of orderProducts) {
          try {
            // Call createStockJournal for each OrderProduct
            const res = await createStockJournal(
              productParams.productId,
              productParams.warehouseId,
              productParams.sizeId,
              productParams.colourId,
              productParams.qty,
              productParams.isUpdate,
            )

            // Handle success for each OrderProduct
            toast({
              title: `${res?.data?.message}`,
              status: 'success',
              placement: 'bottom',
            })
          } catch (error) {
            // Handle error for each OrderProduct
            toast({
              title: `${error?.message}`,
              status: 'error',
            })
          }
        }

        try {
          const newUpdateOrder = {
            orderId: clickedItem?.id,
            orderStatusId: 3,
          }
          // Update the order status after processing OrderProducts
          const updateOrderRes = await updateOrder(newUpdateOrder)
          // Handle success for updateOrder
          toast({
            title: `${updateOrderRes?.data?.message}`,
            status: 'success',
            placement: 'bottom',
          })
        } catch (updateOrderError) {
          // Handle error for updateOrder
          toast({
            title: `${updateOrderError?.message}`,
            status: 'error',
          })
        }
      }
    } catch (err) {
      // Handle error for finding the order
      toast({
        title: `${err?.message}`,
        status: 'error',
      })
    }
  }

  const handleRejectButton = async (orderId) => {
    const clickedItem = newOrder.find((order) => order.id === orderId)
    try {
      const newUpdateOrder = {
        orderId: clickedItem?.id,
        orderStatusId: 6,
      }
      // Update the order status after processing OrderProducts
      const updateOrderRes = await updateOrder(newUpdateOrder)
      // Handle success for updateOrder
      toast({
        title: `${updateOrderRes?.data?.message}`,
        status: 'success',
        placement: 'bottom',
      })
    } catch (updateOrderError) {
      // Handle error for updateOrder
      toast({
        title: `${updateOrderError?.message}`,
        status: 'error',
      })
    }
  }

  const [isTabListVisible, setTabListVisible] = useState(false)

  const handleToggleTabList = () => {
    setTabListVisible(!isTabListVisible)
  }

  const isMobile = useBreakpointValue({ base: true, md: false })

  const handleOrderNumberChange = (event) => {
    setOrderNumber(event.target.value)
  }

  const handleOrderDateChange = (event) => {
    setOrderDate(event.target.value)
    // Automatically submit order date when the date changes
    onOrderDateSubmit(event.target.value)
  }

  const handleOrderNumberSubmit = () => {
    onOrderNumberSubmit(orderNumber)
    setOrderNumber('')
  }

  const handleOrderNumberKeyPress = (event) => {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
      event.preventDefault()
      // Submit the order number when Enter key is pressed
      onOrderNumberSubmit(orderNumber)
      setOrderNumber('')
    }
  }

  const handleSelectWarehouseChange = (event) => {
    setSelectedWarehouse(event.target.value)
    onWarehouseSubmit(event.target.value)
  }

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
                padding={'4px 8px 4px 8px'}
                borderRadius={'8px'}
              >
                <Input
                  border={'none'}
                  placeholder="Enter Order Number"
                  name="orderNumber"
                  value={orderNumber}
                  onChange={handleOrderNumberChange}
                  onKeyPress={handleOrderNumberKeyPress}
                />
                <Button
                  type="submit"
                  style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                  onClick={handleOrderNumberSubmit}
                >
                  <Icon as={MagnifyingGlassIcon} />
                </Button>
              </Box>
              <Box bgColor={'white'} w={'250px'} padding={'4px 12px 4px 8px'} borderRadius={'8px'}>
                <Select
                  placeholder="Warehouse Name"
                  border={'none'}
                  value={selectedWarehouse}
                  onChange={handleSelectWarehouseChange}
                >
                  {warehouseData.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box bgColor={'white'} w={'230px'} padding={'4px 12px 4px 8px'} borderRadius={'8px'}>
                <Input
                  border={'none'}
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  name="orderDate"
                  value={orderDate}
                  onChange={handleOrderDateChange}
                />
              </Box>
            </Box>
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
          {isMobile && (
            <Box
              onClick={handleToggleTabList}
              w={'full'}
              h={'30px'}
              bgColor={'white'}
              display={'flex'}
              alignItems={'center'}
              paddingLeft={'6px'}
              borderRadius={'6px'}
            >
              {isTabListVisible ? (
                <Icon as={XMarkIcon} boxSize={'24px'} />
              ) : (
                <Icon as={Bars3Icon} boxSize={'24px'} />
              )}
            </Box>
          )}
          <Tabs>
            {(isTabListVisible || !isMobile) && (
              <TabList
                display={'flex'}
                flexDirection={{ base: 'column', md: 'row' }}
                borderBottom={{ base: 'none', md: '2px solid #d1d1d1' }}
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
            )}
            <TabPanels>
              {/* New Order */}
              <TabPanel padding={{ base: '16px 0 16px 0', xl: '16px' }}>
                <Box display={{ base: 'flex', xl: 'none' }} flexDirection={'column'} gap={'16px'}>
                  {newOrder?.map((items) => (
                    <Box
                      key={items.id}
                      w={'full'}
                      h={'fit-content'}
                      bgColor={'white'}
                      borderRadius={'12px'}
                      padding={'16px'}
                    >
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
                              {items?.orderDate}
                            </Text>
                            <Box display={'flex'} alignItems={'center'} gap={'12px'}>
                              <Box
                                bgColor={'#E8E7E7'}
                                minW={'8px'}
                                h={'8px'}
                                borderRadius={'50%'}
                              />
                              <Text
                                color={'#838383'}
                                fontFamily={'body'}
                                fontWeight={'600'}
                                fontSize={'14px'}
                                cursor={'pointer'}
                                onClick={() => navigate('/order-management/details')}
                              >
                                No. Order {items?.orderNumber}
                              </Text>
                            </Box>
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
                              <Box
                                bgColor={'brand.grey100'}
                                w={'112px'}
                                h={'112px'}
                                cursor={'pointer'}
                                onClick={() => navigate('/order-management/details')}
                              ></Box>
                              <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
                                <Text
                                  fontFamily={'body'}
                                  fontWeight={'600'}
                                  fontSize={'14px'}
                                  cursor={'pointer'}
                                  onClick={() => navigate('/order-management/details')}
                                >
                                  {items?.OrderProducts[0]?.stocks?.product?.name}
                                </Text>
                                <Text
                                  fontFamily={'body'}
                                  fontWeight={'600'}
                                  fontSize={'14px'}
                                  color={'#838383'}
                                >
                                  {items?.OrderProducts[0]?.stocks?.size?.name},{' '}
                                  {items?.OrderProducts[0]?.stocks?.colour?.name}
                                </Text>
                                <Text
                                  fontFamily={'body'}
                                  fontWeight={'600'}
                                  fontSize={'14px'}
                                  color={'#838383'}
                                >
                                  {items?.OrderProducts[0]?.quantity} item x Rp{' '}
                                  {items?.OrderProducts[0]?.stocks?.product?.price}
                                </Text>
                                {items?.OrderProducts.length > 1 && (
                                  <Box>
                                    <Text
                                      fontFamily={'body'}
                                      fontWeight={'600'}
                                      fontSize={'14px'}
                                      onClick={() => handleToggleProducts(items.id)}
                                      color="#CD0244"
                                      cursor="pointer"
                                    >
                                      {expandedProducts[items?.id]
                                        ? '- Less Products'
                                        : `+ More Products (${items?.OrderProducts.length - 1})`}
                                    </Text>
                                  </Box>
                                )}
                              </Box>
                            </Box>
                            <Collapse in={expandedProducts[items.id]}>
                              <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
                                {items?.OrderProducts.slice(1).map((product, index) => (
                                  <Box display={'flex'} gap={'16px'} key={index}>
                                    <Box bgColor={'brand.grey100'} w={'112px'} h={'112px'}></Box>
                                    <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
                                      <Text
                                        fontFamily={'body'}
                                        fontWeight={'600'}
                                        fontSize={'14px'}
                                      >
                                        {product?.stocks?.product?.name}
                                      </Text>
                                      <Text
                                        fontFamily={'body'}
                                        fontWeight={'600'}
                                        fontSize={'14px'}
                                        color={'#838383'}
                                      >
                                        {product?.stocks?.size?.name},{' '}
                                        {product?.stocks?.colour?.name}
                                      </Text>
                                      <Text
                                        fontFamily={'body'}
                                        fontWeight={'600'}
                                        fontSize={'14px'}
                                        color={'#838383'}
                                      >
                                        {product?.quantity} item x Rp{' '}
                                        {product?.stocks?.product?.price}
                                      </Text>
                                    </Box>
                                  </Box>
                                ))}
                              </Box>
                            </Collapse>
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
                              Rp {items?.totalPrice}
                            </Text>
                          </Box>
                        </Box>
                        <Box w={'full'} display={'flex'} justifyContent={'flex-end'} gap={'16px'}>
                          <Button
                            bgColor={'white'}
                            color={'#CD0244'}
                            border={'1px solid #CD0244'}
                            onClick={() => handleRejectButton(items?.id)}
                          >
                            Reject
                          </Button>
                          <Button
                            bgColor={'#CD0244'}
                            color={'white'}
                            onClick={() => handleAcceptButton(items?.id)}
                          >
                            Accept
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <OrderManagementTable orderData={newOrder} />
              </TabPanel>
              {/* On Process */}
              <TabPanel>
                <TableContainer borderRadius={'8px'}>
                  <Table>
                    <Thead bgColor={'#CD0244'}>
                      <Tr>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Time Transaction
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Warehouse
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Order Number
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Customer’s Name
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Product
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Total Price
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Status Payment
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Action
                          </Text>
                        </Td>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {onProcess.map((items, index) => (
                        <Tr
                          key={index}
                          bg={index % 2 === 0 ? '#FFF1F5' : 'white'}
                          // _hover={{ bg: '#FED7E2' }}
                        >
                          <Td>
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                              {items?.orderDate}
                            </Text>
                          </Td>
                          <Td>
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                              {items?.warehouse?.id}
                            </Text>
                          </Td>
                          <Td>
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                              {items?.orderNumber}
                            </Text>
                          </Td>
                          <Td>
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                              {items?.User?.username}
                            </Text>
                          </Td>
                          <Td>
                            <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                              <Box display={'flex'} gap={'8px'}>
                                <Box w={'66px'} h={'66px'} bgColor={'#D9D9D9'} />
                                <Box>
                                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                                    {items?.OrderProducts[0]?.stocks?.product?.name}
                                  </Text>
                                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                                    {items?.OrderProducts[0]?.stocks?.size?.name},{' '}
                                    {items?.OrderProducts[0]?.stocks?.colour?.name}
                                  </Text>
                                  <Text fontFamily={'body'} fontWeight={'400'} fontSize={'14px'}>
                                    {items?.OrderProducts[0]?.quantity} item x Rp{' '}
                                    {items?.OrderProducts[0]?.stocks?.product?.price}
                                  </Text>
                                </Box>
                              </Box>
                              <Collapse in={expandedProducts[items.id]}>
                                {items?.OrderProducts.slice(1).map((product, index) => (
                                  <Box display={'flex'} gap={'8px'} key={index}>
                                    <Box w={'66px'} h={'66px'} bgColor={'#D9D9D9'} />
                                    <Box>
                                      <Text
                                        fontFamily={'body'}
                                        fontWeight={'600'}
                                        fontSize={'14px'}
                                      >
                                        {product?.stocks?.product?.name}
                                      </Text>
                                      <Text
                                        fontFamily={'body'}
                                        fontWeight={'600'}
                                        fontSize={'14px'}
                                      >
                                        {product?.stocks?.size?.name},{' '}
                                        {product?.stocks?.colour?.name}
                                      </Text>
                                      <Text
                                        fontFamily={'body'}
                                        fontWeight={'400'}
                                        fontSize={'14px'}
                                      >
                                        {product?.quantity} item x Rp{' '}
                                        {product?.stocks?.product?.price}
                                      </Text>
                                    </Box>
                                  </Box>
                                ))}
                              </Collapse>
                              {items?.OrderProducts?.length > 1 && (
                                <Box display={'flex'} alignItems={'center'} gap={'6px'}>
                                  <Box
                                    cursor={'pointer'}
                                    onClick={() => handleToggleProducts(items.id)}
                                  >
                                    {expandedProducts[items.id] ? (
                                      <Box display={'flex'} alignItems={'center'} gap={'6px'}>
                                        <Icon as={ChevronUpIcon} color={'#CD0244'} />
                                        <Text
                                          fontFamily={'body'}
                                          fontWeight={'400'}
                                          fontSize={'14px'}
                                          color={'#CD0244'}
                                        >
                                          Less Products
                                        </Text>
                                      </Box>
                                    ) : (
                                      <Box display={'flex'} alignItems={'center'} gap={'6px'}>
                                        <Icon as={ChevronDownIcon} color={'#CD0244'} />
                                        <Text
                                          fontFamily={'body'}
                                          fontWeight={'400'}
                                          fontSize={'14px'}
                                          color={'#CD0244'}
                                        >
                                          More Products ({items.OrderProducts.length - 1})
                                        </Text>
                                      </Box>
                                    )}
                                  </Box>
                                </Box>
                              )}
                            </Box>
                          </Td>
                          <Td>
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                              {items?.totalPrice}
                            </Text>
                          </Td>
                          <Td>
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                              {items?.Payment?.paymentStatus}
                            </Text>
                          </Td>
                          <Td>
                            <Box display={'flex'} gap={'8px'}>
                              <Button size={'sm'} bgColor={'#CD0244'} color={'white'}>
                                Submit
                              </Button>
                              <Button size={'sm'} border={'1px solid #CD0244'} color={'#CD0244'}>
                                Cancel
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
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Time Transaction
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Warehouse
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Order Number
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Customer’s Name
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Product
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Total Price
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Status Payment
                          </Text>
                        </Td>
                        <Td>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'14px'}
                            color={'white'}
                          >
                            Action
                          </Text>
                        </Td>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {newOrder.map((row, index) => (
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

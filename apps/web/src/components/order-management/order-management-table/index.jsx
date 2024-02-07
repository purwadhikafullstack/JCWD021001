import React, { useState, useEffect } from 'react'
import {
  Box,
  Text,
  Collapse,
  Icon,
  Button,
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
import ReactPaginate from 'react-paginate'
import {
    HomeIcon,
    MagnifyingGlassIcon,
    ChevronDownIcon,
    ChevronUpIcon,
  } from '@heroicons/react/24/outline'

const OrderManagementTable = ({ orderData }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [visiblePages, setVisiblePages] = useState(3) // Jumlah halaman yang ditampilkan
  const itemsPerPage = 1

  useEffect(() => {
    setCurrentPage(0)
  }, [orderData])

  const pageCount = Math.ceil(20 / itemsPerPage)

  const visiblePageNumbers = Array.from(
    { length: Math.min(visiblePages, pageCount) },
    (_, index) => index + currentPage + 1,
  )

  const handleVisiblePageChange = (pageNumber) => {
    if (pageNumber > pageCount) {
        setCurrentPage(pageCount - 1);
      } else if (pageNumber <= 0) {
        setCurrentPage(0);
      } else {
        setCurrentPage(pageNumber - 1);
      }
  }

  const currentItems = orderData.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  )

  const [expandedProducts, setExpandedProducts] = useState({})

  const handleToggleProducts = (orderId) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  return (
    <Box>
      <TableContainer display={{ base: 'none', xl: 'block' }} borderRadius={'8px'}>
        <Table>
          <Thead bgColor={'#CD0244'}>
            <Tr>
              <Td>
                <Text fontFamily={'body'} fontWeight={'700'} fontSize={'14px'} color={'white'}>
                  Time Transaction
                </Text>
              </Td>
              <Td>
                <Text fontFamily={'body'} fontWeight={'700'} fontSize={'14px'} color={'white'}>
                  Warehouse
                </Text>
              </Td>
              <Td>
                <Text fontFamily={'body'} fontWeight={'700'} fontSize={'14px'} color={'white'}>
                  Order Number
                </Text>
              </Td>
              <Td>
                <Text fontFamily={'body'} fontWeight={'700'} fontSize={'14px'} color={'white'}>
                  Customer’s Name
                </Text>
              </Td>
              <Td>
                <Text fontFamily={'body'} fontWeight={'700'} fontSize={'14px'} color={'white'}>
                  Product
                </Text>
              </Td>
              <Td>
                <Text fontFamily={'body'} fontWeight={'700'} fontSize={'14px'} color={'white'}>
                  Total Price
                </Text>
              </Td>
              <Td>
                <Text fontFamily={'body'} fontWeight={'700'} fontSize={'14px'} color={'white'}>
                  Status Payment
                </Text>
              </Td>
              <Td>
                <Text fontFamily={'body'} fontWeight={'700'} fontSize={'14px'} color={'white'}>
                  Action
                </Text>
              </Td>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((items, index) => (
              <Tr
                key={index}
                bg={index % 2 === 0 ? '#FFF1F5' : 'white'}
                // _hover={{ bg: '#FED7E2' }}
              >
                <Td cursor={'pointer'} onClick={() => navigate('/order-management/details')}>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                    {items?.orderDate}
                  </Text>
                </Td>
                <Td cursor={'pointer'} onClick={() => navigate('/order-management/details')}>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                    {items?.warehouse?.id}
                  </Text>
                </Td>
                <Td cursor={'pointer'} onClick={() => navigate('/order-management/details')}>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                    {items?.orderNumber}
                  </Text>
                </Td>
                <Td cursor={'pointer'} onClick={() => navigate('/order-management/details')}>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                    {items?.User?.username}
                  </Text>
                </Td>
                <Td>
                  <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                    <Box display={'flex'} gap={'8px'}>
                      <Box
                        w={'66px'}
                        h={'66px'}
                        bgColor={'#D9D9D9'}
                        cursor={'pointer'}
                        onClick={() => navigate('/order-management/details')}
                      />
                      <Box cursor={'pointer'} onClick={() => navigate('/order-management/details')}>
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
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                              {product?.stocks?.product?.name}
                            </Text>
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                              {product?.stocks?.size?.name}, {product?.stocks?.colour?.name}
                            </Text>
                            <Text fontFamily={'body'} fontWeight={'400'} fontSize={'14px'}>
                              {product?.quantity} item x Rp {product?.stocks?.product?.price}
                            </Text>
                          </Box>
                        </Box>
                      ))}
                    </Collapse>
                    {items?.OrderProducts?.length > 1 && (
                      <Box display={'flex'} alignItems={'center'} gap={'6px'}>
                        <Box cursor={'pointer'} onClick={() => handleToggleProducts(items.id)}>
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
                    <Button
                      size={'sm'}
                      bgColor={'#CD0244'}
                      color={'white'}
                      onClick={() => handleAcceptButton(items?.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      size={'sm'}
                      border={'1px solid #CD0244'}
                      color={'#CD0244'}
                      onClick={() => handleRejectButton(items?.id)}
                    >
                      Reject
                    </Button>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* {pageCount > 1 && (
        <Box mt="4">
          {Array.from({ length: pageCount }, (_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentPage(index)}
              variant={index === currentPage ? 'solid' : 'outline'}
              colorScheme="teal"
              mx="1"
            >
              {index + 1}
            </Button>
          ))}
        </Box>
      )} */}
      {pageCount > 1 && (
        <Box mt="4">
          {visiblePageNumbers.map((pageNumber, index) => (
            <React.Fragment key={pageNumber}>
              {index === 0 && pageNumber > 1 && (
                <Button
                  onClick={() => handleVisiblePageChange(pageNumber - 1)}
                  variant="outline"
                  colorScheme="teal"
                  mx="1"
                >
                  Prev
                </Button>
              )}
              <Button
                onClick={() => handleVisiblePageChange(pageNumber)}
                variant={pageNumber === currentPage + 1 ? 'solid' : 'outline'}
                colorScheme="teal"
                mx="1"
              >
                {pageNumber}
              </Button>
            </React.Fragment>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default OrderManagementTable

import React from 'react'
import {
  Box,
  Text,
  Collapse,
  Icon,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import toRupiah from '@develoka/angka-rupiah-js'
import { useNavigate } from 'react-router-dom'

const OnProcessTable = ({
  orderData,
  expandedProducts,
  handleToggleProducts,
  handleSendButton,
  handleCanceltOnProcess,
  formatDate,
}) => {
  const navigate = useNavigate()
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
                  No. Order & Name
                </Text>
              </Td>
              <Td>
                <Text fontFamily={'body'} fontWeight={'700'} fontSize={'14px'} color={'white'}>
                  Product
                </Text>
              </Td>
              <Td>
                <Text fontFamily={'body'} fontWeight={'700'} fontSize={'14px'} color={'white'}>
                  Gross Amount
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
            {orderData.map((items, index) => (
              <Tr
                key={index}
                bg={index % 2 === 0 ? '#FFF1F5' : 'white'}
                // _hover={{ bg: '#FED7E2' }}
              >
                <Td>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                    {formatDate(items?.orderDate)}
                  </Text>
                </Td>
                <Td>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                    {items?.warehouse?.id}
                  </Text>
                </Td>
                <Td>
                  <Box display={'flex'} flexDirection={'column'} gap={'12px'}>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'600'}
                      fontSize={'14px'}
                      cursor={'pointer'}
                      onClick={() =>
                        navigate('/dashboard/order-management/details', {
                          state: { orderId: items?.id },
                        })
                      }
                    >
                      {items?.orderNumber}
                    </Text>
                    <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                      {items?.User?.username}
                    </Text>
                  </Box>
                </Td>
                <Td>
                  <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                    <Box display={'flex'} gap={'8px'}>
                      <Box
                        w={'66px'}
                        h={'66px'}
                        bgColor={'#D9D9D9'}
                        cursor={'pointer'}
                        onClick={() =>
                          navigate('/dashboard/order-management/details', {
                            state: { orderId: items?.id },
                          })
                        }
                      />
                      <Box
                        cursor={'pointer'}
                        onClick={() =>
                          navigate('/dashboard/order-management/details', {
                            state: { orderId: items?.id },
                          })
                        }
                      >
                        <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                          {items?.OrderProducts[0]?.stocks?.product?.name}
                        </Text>
                        <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                          {items?.OrderProducts[0]?.stocks?.size?.name},{' '}
                          {items?.OrderProducts[0]?.stocks?.colour?.name}
                        </Text>
                        <Text fontFamily={'body'} fontWeight={'400'} fontSize={'14px'}>
                          {items?.OrderProducts[0]?.quantity} item x{' '}
                          {toRupiah(+items?.OrderProducts[0]?.stocks?.product?.price, {
                            floatingPoint: 0,
                          })}
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
                              {product?.quantity} item x{' '}
                              {toRupiah(+product?.stocks?.product?.price, {
                                floatingPoint: 0,
                              })}
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
                  <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                    <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                      {`${toRupiah(+items?.Payment?.grossAmount, { floatingPoint: 0 })}`}
                    </Text>
                    <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                      {`(${items?.Payment?.paymentStatus})`}
                    </Text>
                  </Box>
                </Td>
                <Td>
                  <Box display={'flex'} gap={'8px'}>
                    <Button
                      size={'sm'}
                      bgColor={'#CD0244'}
                      color={'white'}
                      onClick={() => handleSendButton(items?.id)}
                    >
                      Send
                    </Button>
                    <Button
                      size={'sm'}
                      border={'1px solid #CD0244'}
                      color={'#CD0244'}
                      onClick={() => handleCanceltOnProcess(items?.id)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default OnProcessTable

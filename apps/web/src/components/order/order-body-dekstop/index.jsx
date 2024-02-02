import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Td, TableContainer } from '@chakra-ui/react'
import toRupiah from '@develoka/angka-rupiah-js'

const OrderBodyDesktop = ({ orderItem }) => {
  return (
    <Box>
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
                        {item?.product?.name}
                      </Text>
                      <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                        {toRupiah(+item?.product?.price, { floatingPoint: 0 })}
                      </Text>
                    </Box>
                  </Box>
                </Td>
                <Td>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                    {item?.size?.name}
                  </Text>
                </Td>
                <Td>
                  <Box display={'flex'} alignItems={'center'} gap={'16px'}>
                    <Box
                      w={'36px'}
                      h={'36px'}
                      bgColor={item?.colour?.name}
                      borderRadius={'6px'}
                      border={'1px'}
                    />
                    <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                      {item?.colour?.name}
                    </Text>
                  </Box>
                </Td>
                <Td>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                    {item?.quantity}
                  </Text>
                </Td>
                <Td>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#CD0244'}>
                    {toRupiah(+item?.price, { floatingPoint: 0 })}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default OrderBodyDesktop

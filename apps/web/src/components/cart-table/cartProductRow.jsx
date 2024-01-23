import React from 'react'
import { Box, Text, Button, Icon, Checkbox } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Td, TableContainer } from '@chakra-ui/react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import toRupiah from '@develoka/angka-rupiah-js'

const CartProductRow = ({
  cartItem,
  selectedCartProducts,
  selectAllChecked,
  handleButtonClick,
  handleDeleteButtonClick,
  handleCheckboxChange,
  handleSelectAllChange,
  productData,
}) => {
  console.log('cartItem', cartItem);
  return (
    <Box w={{ xl: '1100px', '2xl': '1420px' }}>
      <TableContainer>
        <Table variant="simple" bgColor={'white'}>
          <Thead border="100px">
            <Tr borderBottomWidth={'16px'} borderBottomColor={'brand.grey100'}>
              <Td w={'20px'} padding={'16px'} colSpan={2}>
                <Box display={'flex'} alignItems={'center'} gap={'12px'}>
                  <Checkbox
                    colorScheme="red"
                    size="md"
                    onChange={handleSelectAllChange}
                    isChecked={selectAllChecked}
                  >
                    <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                      Select All
                    </Text>
                  </Checkbox>
                  <Box w={'1px'} h={'20px'} bgColor={'#000000'} />
                  <Box cursor={'pointer'} onClick={handleDeleteButtonClick}>
                    <Text
                      color={'#CD0244'}
                      fontFamily={'body'}
                      fontWeight={'600'}
                      fontSize={'16px'}
                    >
                      Delete
                    </Text>
                  </Box>
                </Box>
              </Td>
              <Td fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                Size
              </Td>
              <Td fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                Color
              </Td>
              <Td fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                Quantity
              </Td>
              <Td fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                Total Price
              </Td>
            </Tr>
          </Thead>
          <Tbody>
            {cartItem?.CartProducts?.map((item) => (
              <Tr key={item.id}>
                <Td padding={'16px'}>
                  <Checkbox
                    colorScheme="red"
                    size="md"
                    onChange={() => handleCheckboxChange(item.id)}
                    isChecked={selectedCartProducts.includes(item.id)}
                  />
                </Td>
                <Td>
                  <Box w={'300px'} display={'flex'} gap={'16px'}>
                    <Box minW={'64px'} h={'64px'} bgColor={'brand.grey100'} />
                    <Box
                      w={'220px'}
                      overflow={'hidden'}
                      display={'flex'}
                      flexDirection={'column'}
                      gap={'10px'}
                    >
                      <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                        {item?.stocks?.products?.name}
                      </Text>
                      <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                        {toRupiah(+item?.stocks?.products?.price, { floatingPoint: 0 })}
                      </Text>
                    </Box>
                  </Box>
                </Td>
                <Td>
                  <Box
                    w={'56px'}
                    h={'36px'}
                    border={'1px solid #D9D9D9'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRadius={'6px'}
                  >
                    <Text
                      fontFamily={'body'}
                      fontWeight={'600'}
                      fontSize={'16px'}
                      color={'#838383'}
                    >
                      L
                    </Text>
                  </Box>
                </Td>
                <Td>
                  <Box display={'flex'} alignItems={'center'} gap={'16px'}>
                    <Box w={'36px'} h={'36px'} bgColor={'#2F4E7A'} borderRadius={'6px'} />
                    <Box
                      w={'116px'}
                      h={'36px'}
                      border={'1px solid #D9D9D9'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      borderRadius={'6px'}
                    >
                      <Text
                        fontFamily={'body'}
                        fontWeight={'600'}
                        fontSize={'16px'}
                        color={'#838383'}
                      >
                        Dark Blue
                      </Text>
                    </Box>
                  </Box>
                </Td>
                <Td>
                  <Box
                    w={'130px'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={'8px'}
                    border={'1px solid #DEDCDC'}
                    borderRadius={'8px'}
                  >
                    <Button
                      variant="ghost"
                      // onClick={() => debouncedUpdateCart(item.id, Math.max(1, item.quantity - 1), onCartUpdated)}
                      onClick={() => handleButtonClick(item.id, -1)}
                      isDisabled={item?.quantity === 1}
                    >
                      <Icon as={MinusIcon} color={'brand.lightred'} />
                    </Button>
                    <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                      {productData[item.id]?.quantity || item?.quantity}
                    </Text>
                    <Button
                      variant="ghost"
                      // onClick={() => debouncedUpdateCart(item.id, Math.min(10, item.quantity + 1), onCartUpdated)}
                      onClick={() => handleButtonClick(item.id, 1)}
                      isDisabled={item?.quantity === 10}
                    >
                      <Icon as={PlusIcon} color={'brand.lightred'} />
                    </Button>
                  </Box>
                </Td>
                <Td fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                  {toRupiah(+item?.price, { floatingPoint: 0 })}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
export default CartProductRow

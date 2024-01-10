import { Box, Text, Button, Icon, ButtonGroup, Checkbox, Select } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { updateCart } from '../../pages/cart/services/updateCart'
import { useState, useEffect } from 'react'
import { deleteCart } from '../../pages/cart/services/deleteCart'

const LaptopCartTable = ({ cartData, onCartUpdated }) => {
  // console.log(cartData)
  const [selectedCartProducts, setSelectedCartProducts] = useState([])
  const [selectAllChecked, setSelectAllChecked] = useState(false)

  // console.log('select', selectedCartProducts)

  const handleCheckboxChange = (productId) => {
    setSelectedCartProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId)
      } else {
        return [...prevSelected, productId]
      }
    })
  }

  const handleSelectAllChange = () => {
    setSelectAllChecked((prevChecked) => !prevChecked)
  }

  useEffect(() => {
    if (selectAllChecked) {
      // If "Select All" is checked, select all products
      setSelectedCartProducts(
        cartData.flatMap((cartItem) => cartItem.CartProducts.map((item) => item.id)),
      )
    } else {
      // If "Select All" is unchecked, clear the selection
      setSelectedCartProducts([])
    }
  }, [selectAllChecked, cartData])

  return (
    <Box padding={'24px'} display={{ base: 'none', xl: 'block' }}>
      <Text mb={'8px'} fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
        Shopping Cart
      </Text>
      {cartData.map((cartItem) => (
        <Box key={cartItem.id} display={'flex'} gap={'16px'} justifyContent={'center'}>
          <Box w={{ xl: '980px', '2xl': '1420px' }}>
            <TableContainer>
              <Table variant="simple" bgColor={'white'}>
                <Thead border="100px">
                  <Tr borderBottomWidth={'16px'} borderBottomColor={'brand.grey100'}>
                    <Td w={'20px'} padding={'16px'} colSpan={2}>
                      <Box display={'flex'} alignItems={'center'} gap={'12px'}>
                        <Checkbox
                          size="md"
                          onChange={handleSelectAllChange}
                          isChecked={selectAllChecked}
                        >
                          <Text>Select All</Text>
                        </Checkbox>
                        <Box w={'1px'} h={'20px'} bgColor={'#000000'} />
                        <Box cursor={'pointer'} onClick={() => deleteCart(selectedCartProducts, onCartUpdated)}>
                          <Text color={'#CD0244'}>Delete</Text>
                        </Box>
                      </Box>
                    </Td>
                    <Td>Size</Td>
                    <Td>Color</Td>
                    <Td>Quantity</Td>
                    <Td>Total Price</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {cartItem.CartProducts.map((item) => (
                    <Tr key={item.id}>
                      <Td padding={'16px'}>
                        <Checkbox
                          size="md"
                          onChange={() => handleCheckboxChange(item.id)}
                          isChecked={selectedCartProducts.includes(item.id)}
                        />
                      </Td>
                      <Td>
                        <Box display={'flex'} gap={'16px'}>
                          <Box w={'64px'} h={'64px'} bgColor={'brand.grey100'} />
                          <Box>
                            <Text>{item.Product.name}</Text>
                            <Text>{item.Product.price}</Text>
                          </Box>
                        </Box>
                      </Td>
                      <Td>
                        <Select placeholder="Size" w={'100px'}>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>
                      </Td>
                      <Td>
                        <Box display={'flex'} alignItems={'center'} gap={'16px'}>
                          <Box w={'36px'} h={'36px'} bgColor={'#2F4E7A'} />
                          <Select placeholder="Color" w={'100px'}>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                          </Select>
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
                            onClick={() => updateCart(item.id, item.quantity + 1, onCartUpdated)}
                          >
                            <Icon as={PlusIcon} color={'brand.lightred'} />
                          </Button>
                          <Text>{item.quantity}</Text>
                          <Button
                            variant="ghost"
                            onClick={() => updateCart(item.id, item.quantity - 1, onCartUpdated)}
                          >
                            <Icon as={MinusIcon} color={'brand.lightred'} />
                          </Button>
                        </Box>
                      </Td>
                      <Td>{item.price}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            w={{ xl: '334px', '2xl': '430px' }}
            h={'fit-content'}
            bgColor={'white'}
            display={'flex'}
            flexDirection={'column'}
            gap={'12px'}
            padding={'16px'}
          >
            <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
              Shopping Summary
            </Text>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
                Total Price ({cartItem.totalQuantity} Items)
              </Text>
              <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
                {cartItem.totalPrice}
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
                {cartItem.totalPrice}
              </Text>
            </Box>
            <Button bgColor={'#CD0244'} color={'#ffffff'}>
              Process to Payment
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default LaptopCartTable

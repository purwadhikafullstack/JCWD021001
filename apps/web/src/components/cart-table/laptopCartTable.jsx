import { Box, Text, Button, Icon, ButtonGroup, Checkbox, Select } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'

const laptopCartTable = () => {
  return (
    <Box padding={'24px'} display={{ base: 'none', xl: 'block' }}>
      <Text mb={'8px'} fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
        Shopping Cart
      </Text>
      <Box display={'flex'} gap={'16px'} justifyContent={'center'}>
        <Box w={{ xl: '980px', '2xl': '1420px' }}>
          <TableContainer>
            <Table variant="simple" bgColor={'white'}>
              <Thead border="100px">
                <Tr borderBottomWidth={'16px'} borderBottomColor={'brand.grey100'}>
                  <Th>
                    <Checkbox size="md" defaultChecked></Checkbox>
                  </Th>
                  <Th>Item</Th>
                  <Th>Size</Th>
                  <Th>Color</Th>
                  <Th>Quantity</Th>
                  <Th>Total Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Checkbox size="md" defaultChecked />
                  </Td>
                  <Td>
                    <Box display={'flex'} gap={'16px'}>
                      <Box w={'64px'} h={'64px'} bgColor={'brand.grey100'} />
                      <Box>
                        <Text>Long Sleeve Bodysuit 1 Pack (Stripe)</Text>
                        <Text>Rp 200.000</Text>
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
                      <Button variant="ghost">
                        <Icon as={PlusIcon} color={'brand.lightred'} />
                      </Button>
                      <Text>1</Text>
                      <Button variant="ghost">
                        <Icon as={MinusIcon} color={'brand.lightred'} />
                      </Button>
                    </Box>
                  </Td>
                  <Td>Rp 400.000</Td>
                </Tr>
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
              Total Price (2 Items)
            </Text>
            <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
              Rp 400.000
            </Text>
          </Box>
          <Box w={'full'} h={'2px'} bgColor={'#F1F1F1'} />
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={'16px'}>
            <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
              Total Price
            </Text>
            <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'} color={'#CD0244'}>
              Rp 400.000
            </Text>
          </Box>
          <Button bgColor={'#CD0244'} color={'#ffffff'}>
            Process to Payment
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default laptopCartTable

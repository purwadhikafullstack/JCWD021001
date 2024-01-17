import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
export const ProductList = () => {
  const navigate = useNavigate()
  return (
    <Box p={'1em'} bgColor={'grey.50'} minH={'100vh'} w={'100%'}>
      <VStack align={'stretch'}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Text fontWeight={'bold'}>Product List</Text>
          <Button
            _hover={{
              bgColor: 'redPure.500',
            }}
            w={'10em'}
            bgColor={'redPure.500'}
            color={'white'}
            onClick={() => {
              navigate('/dashboard/product-list/create-product')
            }}
          >
            Create Product
          </Button>
        </Flex>
        <Box
          h={'25em'}
          overflowX={'scroll'}
          overflowY={'scroll'}
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <TableContainer w={'100%'}>
            <Table
              variant={'striped'}
              colorScheme={'customTableColor'}
              style={{
                padding: '0',
                borderRadius: '.5em',
                overflow: 'hidden',
              }}
            >
              <Thead bg={'redPure.500'} position={'relative'}>
                <Tr>
                  <Th color={'#FEFEFE'} textAlign={'center'}>
                    Products
                  </Th>

                  <Th color={'#FEFEFE'} textAlign={'center'}>
                    Size
                  </Th>
                  <Th color={'#FEFEFE'} textAlign={'center'}>
                    Color
                  </Th>
                  <Th color={'#FEFEFE'} textAlign={'center'}>
                    Price
                  </Th>
                  <Th color={'#FEFEFE'} textAlign={'center'}>
                    Status
                  </Th>
                  <Th color={'#FEFEFE'} textAlign={'center'} w={'10em'}>
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody position={'relative'} color={'#6D6D6D'} fontWeight={'500'}>
                <Tr cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'}>
                  <Td textAlign={'center'}>
                    <Flex justifyContent={'center'} alignItems={'center'}>
                      <Image maxH={'3em'} objectFit={'contain'} />
                    </Flex>
                  </Td>
                  <Td textAlign={'center'}>Size</Td>
                  <Td textAlign={'center'}>Color</Td>
                  <Td textAlign={'center'}>Price</Td>
                  <Td textAlign={'center'}>Status</Td>
                  <Td textAlign={'center'} alignItems={'center'}>
                    <HStack>
                      <Button
                        _hover={{
                          bgColor: 'redPure.500',
                        }}
                        w={'5em'}
                        bgColor={'redPure.500'}
                        color={'white'}
                      >
                        Edit
                      </Button>
                      <Button
                        _hover={{
                          bgColor: 'transparent',
                        }}
                        w={'5em'}
                        border={'1px solid #e3024b'}
                        bgColor={'transparent'}
                        color={'redPure.500'}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </Box>
  )
}

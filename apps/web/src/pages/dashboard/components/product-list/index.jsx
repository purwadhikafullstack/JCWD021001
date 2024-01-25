import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProduct } from '../../../product-list/services/readProduct'
import axios from 'axios'
import { PaginationList } from './components/pagination-list'
export const ProductList = () => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')

  // PATHNAME
  const pathName = location.pathname

  // NAVIGATE
  const navigate = useNavigate()

  // TOAST
  const toast = useToast()

  // PRODUCTS
  const [products, setProducts] = useState([])
  useEffect(() => {
    getProduct('', '', '', '', setProducts, 'name', 'ASC', pageValue)
  }, [pageValue])

  // DELETE PRODUCT IMAGES
  const deleteProductImage = async (id, productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/product-image`, { data: { id, productId } })
    } catch (err) {
      throw err
    }
  }

  // DELETE PRODUCTS
  const deleteProduct = async (id, productId) => {
    try {
      await deleteProductImage('', productId)
      const res = await axios.delete(`http://localhost:8000/api/product/${id}`)
      setProducts((products) => products.filter((product) => product.id !== id))
      toast({
        title: `${res?.data?.title}`,
        status: 'success',
        placement: 'bottom',
      })
    } catch (err) {
      toast({
        title: `${err?.message}`,
        status: 'error',
      })
    }
  }

  return (
    <Box p={'1em'} h={'100%'} w={'100%'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
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
            h={'70%'}
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
                    <Th color={'#FEFEFE'} textAlign={'center'}></Th>
                    <Th color={'#FEFEFE'} textAlign={'center'}>
                      Price
                    </Th>
                    <Th color={'#FEFEFE'} textAlign={'center'} w={'10em'}>
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody position={'relative'} color={'#6D6D6D'} fontWeight={'500'}>
                  {products?.rows?.map((el, index) => {
                    return (
                      <Tr cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'} key={index}>
                        <Td textAlign={'center'}>
                          <AspectRatio h={'3em'} w={'3em'} ratio={1}>
                            <Image
                              src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/productImages/${
                                el?.picture[0]?.imageUrl
                              }`}
                              objectFit={'cover'}
                            />
                          </AspectRatio>
                        </Td>
                        <Td>{el?.name}</Td>
                        <Td textAlign={'center'}>{el.price}</Td>
                        <Td textAlign={'center'} alignItems={'center'}>
                          <HStack>
                            <Button
                              _hover={{
                                bgColor: 'redPure.500',
                              }}
                              w={'5em'}
                              bgColor={'redPure.500'}
                              color={'white'}
                              onClick={() => {
                                navigate(`/dashboard/product-list/edit-product/${el.id}`)
                              }}
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
                              onClick={() => {
                                deleteProduct(el?.id, el?.id)
                              }}
                            >
                              Delete
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
        <Spacer />
        <PaginationList location={location} pathName={pathName} pageValue={pageValue} />
      </Flex>
    </Box>
  )
}

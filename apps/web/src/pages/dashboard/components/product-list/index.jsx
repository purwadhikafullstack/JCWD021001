import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
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
import toRupiah from '@develoka/angka-rupiah-js'
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
    getProduct('', '', '', '', setProducts, 'name', 'ASC', pageValue, 10)
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
      setProducts((products) => products?.rows?.filter((product) => product.id !== id))
      toast({
        title: `${res?.data?.title}`,
        status: 'success',
        placement: 'bottom',
        top: '0',
        bottom: 'auto',
        position: 'fixed',
      })
    } catch (err) {
      toast({
        title: `${err?.message}`,
        status: 'error',
      })
    }
  }

  // Toggle Box Colour
  const [boxToggle, setBoxToggle] = useState({ [pageValue]: true })

  // Handle Toggle
  const changeBoxToggle = (id) => {
    setBoxToggle((set) => ({
      [id]: !set[id],
      [!id]: set[id],
    }))
  }

  return (
    <Box p={'1em'} w={'100%'} h={'100%'}>
      <Flex flexDir={'column'} justifyContent={'space-between'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Heading as={'h1'} fontSize={'1.5em'} fontWeight={'bold'}>
              Product List
            </Heading>
            <Button
              _hover={{
                bgColor: 'redPure.600',
              }}
              h={'3em'}
              w={'10em'}
              bgColor={'redPure.600'}
              color={'white'}
              onClick={() => {
                navigate('/dashboard/product-list/create-product')
              }}
            >
              Create Product
            </Button>
          </Flex>
          <Box
            boxShadow={'md'}
            h={'27em'}
            borderRadius={'.5em'}
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
                <Thead bg={'redPure.600'} position={'relative'}>
                  <Tr>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Products
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}></Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Price
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'} w={'10em'}>
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody position={'relative'} fontWeight={'bold'}>
                  {products?.rows?.map((el, index) => {
                    return (
                      <Tr cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'} key={index}>
                        <Td>
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
                        <Td>{toRupiah(el.price)}</Td>
                        <Td alignItems={'center'}>
                          <HStack>
                            <Button
                              _hover={{
                                bgColor: 'redPure.600',
                              }}
                              fontSize={'.8em'}
                              h={'2.5em'}
                              w={'5em'}
                              bgColor={'redPure.600'}
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
                              fontSize={'.8em'}
                              h={'2.5em'}
                              w={'5em'}
                              border={'1px solid #CD0244'}
                              bgColor={'transparent'}
                              color={'redPure.600'}
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
        <PaginationList
          boxToggle={boxToggle}
          changeBoxToggle={changeBoxToggle}
          location={location}
          pathName={pathName}
          pageValue={pageValue}
        />
      </Flex>
    </Box>
  )
}

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
import toRupiah from '@develoka/angka-rupiah-js'
import { CreateButton } from './components/create-button'
import { PaginationList } from './components/pagination-list'
import { EditButton } from './components/edit-button'
import { DeleteButton } from './components/delete-button'
export const ProductList = (props) => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')

  // PATHNAME
  const pathName = location.pathname

  // Trigger
  const [trigger, setTrigger] = useState(true)
  // PRODUCTS

  const [products, setProducts] = useState([])
  useEffect(() => {
    getProduct('', '', '', '', setProducts, 'name', 'ASC', pageValue, 10)
  }, [pageValue, trigger])

  // Toggle Box Colour
  const [boxToggle, setBoxToggle] = useState({ [pageValue]: true })

  // Handle Toggle
  const changeBoxToggle = (id) => {
    if (pageValue != id) {
      setBoxToggle((set) => ({
        [id]: !set[id],
        [!id]: set[id],
      }))
    }
  }

  return (
    <Box p={'1em'} w={'100%'} h={'100%'}>
      <Flex flexDir={'column'} justifyContent={'space-between'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Heading as={'h1'} fontSize={'1.5em'} fontWeight={'bold'}>
              Product List
            </Heading>
            {props.isSuperAdmin && (
              <CreateButton navigate={'/dashboard/product-list/create-product'} />
            )}
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
                            {props?.isSuperAdmin && (
                              <EditButton
                                navigate={`/dashboard/product-list/edit-product/${el.id}`}
                              />
                            )}
                            {props?.isSuperAdmin && (
                              <DeleteButton
                                id={el?.id}
                                productId={el?.id}
                                trigger={trigger}
                                setTrigger={setTrigger}
                              />
                            )}
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

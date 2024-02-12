import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Spacer,
  Stack,
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
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProduct } from '../../../product-list/services/readProduct'
import toRupiah from '@develoka/angka-rupiah-js'
import { CreateButton } from './components/create-button'
import { PaginationList } from './components/pagination-list'
import { EditButton } from './components/edit-button'
import { DeleteButton } from './components/delete-button'
import { ViewButton } from './components/view-button'
import { SearchInput } from '../create-stock/component/search-input'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
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

  //   PRODUCT NAME FILTER
  const [productNameFilter, setProductNameFilter] = useState('')

  // Toggle Box Colour
  const [boxToggle, setBoxToggle] = useState({ 1: true })

  // Handle Toggle
  const changeBoxToggle = (id) => {
    if (pageValue != id) {
      setBoxToggle((set) => ({
        [id]: !set[id],
        [!id]: set[id],
      }))
    }
  }

  const [products, setProducts] = useState([])
  useEffect(() => {
    getProduct(productNameFilter, '', '', '', setProducts, 'name', 'ASC', pageValue, 10)
    changeBoxToggle(pageValue)
  }, [pageValue, trigger, productNameFilter])

  return (
    <Box height={'100%'} w={'100%'} minH={'100vh'}>
      <Flex
        flexDir={'column'}
        justifyContent={'space-between'}
        maxW={'100%'}
        overflowX={'auto'}
        p={'1em'}
      >
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Heading
              as={'h1'}
              fontSize={{ base: '1em', md: '1.5em' }}
              fontWeight={'bold'}
              justifyContent={'space-between'}
            >
              Product List
            </Heading>
            <Stack align={'flex-end'} direction={{ base: 'column', lg: 'row' }}>
              <Box>
                <SearchInput
                  setProductNameFilter={setProductNameFilter}
                  pageValue={pageValue}
                  changeBoxToggle={changeBoxToggle}
                />
              </Box>
              {props.isSuperAdmin && (
                <CreateButton navigate={'/dashboard/product-list/create-product'} />
              )}
            </Stack>
          </Flex>
          <Box
            maxW={'100%'}
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
            <TableContainer>
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
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Name
                    </Th>
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
                          <HStack mt={'.5em'} fontSize={'.75em'} spacing={'.1em'}>
                            <Text>{el?.category?.parent?.parent?.name}</Text>
                            <Icon as={ChevronRightIcon} />
                            <Text>{el?.category?.parent?.name}</Text>
                            <Icon as={ChevronRightIcon} />
                            <Text>{el?.category?.name}</Text>
                          </HStack>
                        </Td>
                        <Td>
                          <Text>{el?.name}</Text>
                        </Td>
                        <Td>{toRupiah(el.price)}</Td>
                        <Td alignItems={'center'}>
                          <HStack>
                            {props?.user?.warehouseId && (
                              <ViewButton
                                navigate={`/dashboard/product-list/view-product/${el.id}`}
                              />
                            )}
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

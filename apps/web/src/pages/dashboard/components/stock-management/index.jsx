import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getStock } from './services/readStock'
import { TableBody } from './component/table-body'
import { PaginationList } from '../product-list/components/pagination-list'

export const StockManagement = () => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(4)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')

  // PATHNAME
  const pathName = location.pathname

  // NAVIGATE
  const navigate = useNavigate()

  // TOAST
  const toast = useToast()

  // STOCKS
  const [stocks, setStocks] = useState([])
  useEffect(() => {
    getStock(warehouseId, pageValue).then((data) => setStocks(data))
  }, [warehouseId, pageValue])

  // Toggle Box Colour
  const [boxToggle, setBoxToggle] = useState({ 1: true })

  // Handle Toggle
  const changeBoxToggle = (id) => {
    setBoxToggle((set) => ({
      [id]: !set[id],
      [!id]: set[id],
    }))
  }
  return (
    <Box p={'1em'} h={'100%'} w={'100%'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Heading as={'h1'} fontSize={'1.5em'} fontWeight={'bold'}>
              Stock Management
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
                navigate('/dashboard/stock-management/create-stock')
              }}
            >
              Create Stock
            </Button>
          </Flex>
          <Box
            h={'70vh'}
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
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Size
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Color
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Price
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'} w={'10em'}>
                      Stock
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'} w={'10em'}>
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody position={'relative'} fontWeight={'bold'}>
                  <TableBody stocks={stocks} warehouseId={warehouseId} pathName={pathName} />
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
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

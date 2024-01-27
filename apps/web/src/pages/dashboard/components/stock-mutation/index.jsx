import {
  Box,
  Button,
  Flex,
  HStack,
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
import { getMutations } from './services/readMutation'

export const StockMutation = () => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(5)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')
  const filterValue = queryParams.get('fi')

  // PATHNAME
  const pathName = location.pathname

  // NAVIGATE
  const navigate = useNavigate()

  // TOAST
  const toast = useToast()

  //   MUTATIONS
  const [mutations, setMutations] = useState([])

  useEffect(() => {
    getMutations(warehouseId, filterValue, pageValue, 10).then((data) => {
      setMutations(data)
    })
  }, [pageValue, filterValue])

  console.log('MUTATIONS', mutations)
  return (
    <Box p={'1em'} h={'100%'} w={'100%'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'}>Stock Mutation</Text>
            <Button
              _hover={{
                bgColor: 'redPure.500',
              }}
              w={'10em'}
              bgColor={'redPure.500'}
              color={'white'}
              onClick={() => {
                navigate('/dashboard/stock-management/create-stock')
              }}
            >
              Form Mutation
            </Button>
          </Flex>
          <HStack>
            <Text onClick={() => navigate(`${pathName}?pa=${pageValue}&fi=0`)}>Request</Text>
            <Text onClick={() => navigate(`${pathName}?pa=${pageValue}&fi=1`)}>Approval</Text>
          </HStack>
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
                <Thead bg={'redPure.500'} position={'relative'}>
                  <Tr>
                    <Th color={'#FEFEFE'}>ID MUTATION</Th>
                    <Th color={'#FEFEFE'}>Warehouse Origin</Th>
                    <Th color={'#FEFEFE'}>Warehouse Destination</Th>
                    <Th color={'#FEFEFE'}>Products</Th>
                    <Th color={'#FEFEFE'} w={'10em'}>
                      Qty
                    </Th>
                    <Th color={'#FEFEFE'} w={'10em'}>
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody position={'relative'} color={'#6D6D6D'} fontWeight={'500'}></Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
      </Flex>
    </Box>
  )
}

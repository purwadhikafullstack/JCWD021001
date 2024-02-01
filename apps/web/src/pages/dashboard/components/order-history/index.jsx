import {
  AspectRatio,
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
import { useEffect, useState } from 'react'
import { getStockJournals } from './services/readStockJournal'
import { useLocation, useParams } from 'react-router-dom'

export const OrderHistory = () => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')

  // STOCK JOURNALS
  const [stockJournals, setStockJournals] = useState([])

  // WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(4)

  // EPID
  const { epid } = useParams()
  useEffect(() => {
    getStockJournals(warehouseId, epid, pageValue, 10).then((data) => setStockJournals(data))
  }, [])

  // RENDERED TABLE BODY
  const renderedTableBody = stockJournals?.rows?.map((stockJournal, index) => {
    const timestamp = stockJournal?.createdAt
    const dateObject = new Date(timestamp)
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
    }).format(dateObject)
    return (
      <Tr cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'} key={index}>
        <Td>{formattedDate}</Td>
        <Td>{stockJournal?.qtyBefore}</Td>
        <Td>{stockJournal?.qty}</Td>
        <Td>{stockJournal?.qtyAfter}</Td>
      </Tr>
    )
  })
  return (
    <Box p={'1em'} h={'100%'} w={'100%'} bgColor={'white'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'}>Order History</Text>
            <Button
              _hover={{
                bgColor: 'redPure.500',
              }}
              w={'10em'}
              bgColor={'redPure.500'}
              color={'white'}
              onClick={() => {}}
            >
              Download
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
                <Thead bg={'redPure.500'} position={'relative'}>
                  <Tr>
                    <Th color={'#FEFEFE'}>Time</Th>
                    <Th color={'#FEFEFE'}>Qty before</Th>
                    <Th color={'#FEFEFE'}>Addition/Reduction</Th>
                    <Th color={'#FEFEFE'} w={'10em'}>
                      Total Stock
                    </Th>
                  </Tr>
                </Thead>
                <Tbody position={'relative'} color={'#6D6D6D'} fontWeight={'500'}>
                  {renderedTableBody}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
      </Flex>
    </Box>
  )
}

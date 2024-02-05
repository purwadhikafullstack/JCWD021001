import {
  Box,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getMonthDates } from '../sales-report/services/utils'
import { getStockReports } from '../stock-management/services/readStock'

export const StockReport = () => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')
  const monthValue = queryParams.get('mo')

  // PATHNAME
  const pathName = location.pathname

  // NAVIGATE
  const navigate = useNavigate()

  const today = new Date('2024-02-01')

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [stockReports, setStockReports] = useState([])

  const [warehouseId, setWarehouseId] = useState(4)

  useEffect(() => {
    setStartDate(getMonthDates(today).startDate)
    setEndDate(getMonthDates(today).endDate)
    getStockReports(pageValue, 10, warehouseId, startDate, endDate).then((data) => {
      setStockReports(data)
    })
  }, [])

  console.log('stock-reports', stockReports)

  const renderedTableBody = stockReports?.map((stockReport, index) => {
    return (
      <Tr key={index} cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'}>
        <Td>{stockReport?.name}</Td>
        <Td>{stockReport?.addition}</Td>
        <Td>{stockReport?.reduction}</Td>
        <Td>{stockReport?.qty}</Td>
        <Td>History</Td>
      </Tr>
    )
  })
  return (
    <Box p={'1em'} h={'100%'} w={'100%'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Heading as={'h1'} fontSize={'1.5em'}>
              Stock Report
            </Heading>
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
                      Product
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Total Addition
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Total Reduction
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Qty Now
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Actions
                    </Th>
                  </Tr>
                </Thead>
                <Tbody position={'relative'} fontWeight={'bold'}>
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

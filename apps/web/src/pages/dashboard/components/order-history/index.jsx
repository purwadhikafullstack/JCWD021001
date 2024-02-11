import {
  Box,
  Button,
  Flex,
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
import { PaginationList } from '../product-list/components/pagination-list'
import {
  getCurrentYear,
  getFirstDateOfMonthByAbbreviation,
} from '../sales-report/component/month-select/utils/services'
import { getMonthDates } from '../sales-report/services/utils'
import { MonthSelect } from '../sales-report/component/month-select'

export const OrderHistory = (props) => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')
  const warehouseValue = queryParams.get('wa')
  const monthValue = queryParams.get(`mo`)
  const warValue = queryParams.get('war')

  // PATHNAME
  const pathName = location.pathname

  // STOCK JOURNALS
  const [stockJournals, setStockJournals] = useState([])

  // WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(props?.user?.warehouseId)

  const [month, setMonth] = useState(
    getFirstDateOfMonthByAbbreviation(monthValue, getCurrentYear()),
  )

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [trigger, setTrigger] = useState(false)

  // EPID
  const { epid } = useParams()
  useEffect(() => {
    if (props?.isSuperAdmin) {
      setStartDate(getMonthDates(new Date(month)).startDate)
      setEndDate(getMonthDates(new Date(month)).endDate)
      getStockJournals(warehouseValue || warValue, epid, startDate, endDate, pageValue, 10).then(
        (data) => setStockJournals(data),
      )
    }
    if (!props?.isSuperAdmin) {
      setStartDate(getMonthDates(new Date(month)).startDate)
      setEndDate(getMonthDates(new Date(month)).endDate)
      setWarehouseId(props?.user?.warehouseId)
      getStockJournals(warehouseId, epid, startDate, endDate, pageValue, 10).then((data) =>
        setStockJournals(data),
      )
    }
  }, [pageValue, trigger, startDate, endDate, monthValue])

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
        <Td>{stockJournal?.isAdding ? `+${stockJournal?.qty}` : `-${stockJournal?.qty}`}</Td>
        <Td>{stockJournal?.qtyAfter}</Td>
      </Tr>
    )
  })

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
    <Box p={'1em'} h={'100%'} w={'100%'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'}>Order History</Text>
            <MonthSelect
              isSuperAdmin={props?.isSuperAdmin}
              warValue={warValue}
              monthValue={monthValue}
              setMonth={setMonth}
              pathName={pathName}
              pageValue={pageValue}
            />
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
                      Time
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Qty before
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Addition/Reduction
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'} w={'10em'}>
                      Total Stock
                    </Th>
                  </Tr>
                </Thead>
                <Tbody
                  position={'relative'}
                  fontWeight={'bold'}
                  setTrigger={setTrigger}
                  trigger={trigger}
                >
                  {renderedTableBody}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
        <PaginationList
          warehouseValue={warehouseValue}
          boxToggle={boxToggle}
          changeBoxToggle={changeBoxToggle}
          location={location}
          pathName={pathName}
          pageValue={pageValue}
          monthValue={monthValue}
          warValue={warValue}
        />
      </Flex>
    </Box>
  )
}

import {
  Box,
  Flex,
  HStack,
  Heading,
  Select,
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
import { HistoryButton } from './components/history-button'
import { MonthSelect } from '../sales-report/component/month-select'
import {
  getCurrentYear,
  getFirstDateOfMonthByAbbreviation,
} from '../sales-report/component/month-select/utils/services'
import { getWarehouses } from '../form-mutation/services/readWarehouse'
import { PaginationList } from '../product-list/components/pagination-list'

export const StockReport = (props) => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')
  const monthValue = queryParams.get('mo')
  const warValue = queryParams.get('war')
  // PATHNAME
  const pathName = location.pathname

  // NAVIGATE
  const navigate = useNavigate()

  const [month, setMonth] = useState(
    getFirstDateOfMonthByAbbreviation(monthValue, getCurrentYear()),
  )

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [stockReports, setStockReports] = useState([])

  const [warehouseId, setWarehouseId] = useState(props?.user?.warehouseId)

  useEffect(() => {
    if (props?.isSuperAdmin) {
      setStartDate(getMonthDates(new Date(month)).startDate)
      setEndDate(getMonthDates(new Date(month)).endDate)
      getStockReports(pageValue, 10, warValue, startDate, endDate).then((data) => {
        setStockReports(data)
      })
    }
    if (!props?.isSuperAdmin) {
      setWarehouseId(props?.user?.warehouseId)
      setStartDate(getMonthDates(new Date(month)).startDate)
      setEndDate(getMonthDates(new Date(month)).endDate)
      getStockReports(pageValue, 10, warehouseId, startDate, endDate).then((data) => {
        setStockReports(data)
      })
    }
  }, [warehouseId, startDate, endDate, month, warValue, pageValue])

  // Warehouse lists
  const [warehouses, setWarehouses] = useState([])

  useEffect(() => {
    getWarehouses('').then((data) => {
      setWarehouses(data)
    })
  }, [])

  // Warehouse options
  const warehouseOptions = warehouses?.map((warehouse, index) => {
    return (
      <option
        key={index}
        id={warehouse?.id}
        value={warehouse?.id}
        selected={warehouse?.id === +warValue}
      >
        {warehouse?.WarehouseAddress?.location}
      </option>
    )
  })

  const renderedTableBody = stockReports?.map((stockReport, index) => {
    return (
      <Tr key={index} cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'}>
        <Td>{stockReport?.name}</Td>
        <Td>{stockReport?.addition}</Td>
        <Td>{stockReport?.reduction}</Td>
        <Td>{stockReport?.qty}</Td>
        <Td>
          <HistoryButton
            pathName={pathName}
            stockId={stockReport?.id}
            monthValue={monthValue}
            warValue={warValue}
          />
        </Td>
      </Tr>
    )
  })

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
  return (
    <Box p={'1em'} w={'100%'} minH={'100vh'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Heading as={'h1'} fontSize={'1.5em'}>
              Stock Report
            </Heading>
            <HStack>
              {props?.isSuperAdmin && (
                <Select
                  placeholder={'Select warehouse'}
                  id={'recipientWarehouseAddress'}
                  name={'recipientWarehouseAddress'}
                  type={'text'}
                  borderColor={'transparent'}
                  focusBorderColor={'transparent'}
                  bgColor={'grey.50'}
                  onChange={async (e) => {
                    setWarehouseId(e?.target?.value)
                    {
                      e?.target?.value
                        ? navigate(`${pathName}?pa=1&mo=${monthValue}&war=${e?.target?.value}`)
                        : navigate(`${pathName}?pa=1`)
                    }
                  }}
                >
                  {warehouseOptions}
                </Select>
              )}
              <MonthSelect
                isSuperAdmin={props?.isSuperAdmin}
                warValue={warValue}
                monthValue={monthValue}
                setMonth={setMonth}
                pathName={pathName}
                pageValue={pageValue}
              />
            </HStack>
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
        <PaginationList
          boxToggle={boxToggle}
          changeBoxToggle={changeBoxToggle}
          location={location}
          pathName={pathName}
          pageValue={pageValue}
          warValue={warValue}
          monthValue={monthValue}
        />
      </Flex>
    </Box>
  )
}

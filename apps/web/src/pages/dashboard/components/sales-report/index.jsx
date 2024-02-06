import { Box, Flex, HStack, Heading, Text, VStack, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getOrders, getOrdersByCategory } from './services/readOrders'
import toRupiah from '@develoka/angka-rupiah-js'
import { SalesTable } from './component/sales-table'
import { ReportTable } from './component/table'
import { getMonthDates } from './services/utils'

export const SalesReport = () => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(5)
  const [requesterWarehouseId, setRequesterWarehouseId] = useState(0)
  const [recipientWarehouseId, setRecipientWarehouseId] = useState(0)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')
  const categoryValue = queryParams.get('cat')
  const monthValue = queryParams.get('mo')

  // PATHNAME
  const pathName = location.pathname

  // NAVIGATE
  const navigate = useNavigate()

  // TOAST
  const toast = useToast()

  // ACTIVE TEXT
  const [textToggle, setTextToggle] = useState({ [categoryValue]: true })

  const changeTextToggle = (id) => {
    if (id !== categoryValue)
      setTextToggle((set) => ({
        [id]: !set[id],
        [!id]: set[id],
      }))
  }

  const today = new Date('2024-01-01')

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    setStartDate(getMonthDates(today).startDate)
    setEndDate(getMonthDates(today).endDate)
  }, [categoryValue])

  return (
    <Box p={'1em'} h={'100%'} w={'100%'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Heading as={'h1'} fontSize={'1.5em'}>
              Sales Report
            </Heading>
          </Flex>
          <HStack fontWeight={'bold'} spacing={'1.5em'}>
            <Text
              id={'all'}
              borderBottom={textToggle['all'] ? '3px solid #CD0244' : 'none'}
              color={textToggle['all'] ? '#CD0244' : 'black'}
              cursor={'pointer'}
              onClick={(e) => {
                changeTextToggle(e.target.id)
                navigate(`${pathName}?pa=${pageValue}&cat=all&mo=jan`)
              }}
            >
              All
            </Text>
            <Text
              id={'cat'}
              borderBottom={textToggle['cat'] ? '3px solid #CD0244' : 'none'}
              color={textToggle['cat'] ? '#CD0244' : 'black'}
              cursor={'pointer'}
              onClick={(e) => {
                changeTextToggle(e.target.id)
                navigate(`${pathName}?pa=${pageValue}&cat=cat&mo=jan`)
              }}
            >
              Category
            </Text>
            <Text
              id={'pro'}
              borderBottom={textToggle['pro'] ? '3px solid #CD0244' : 'none'}
              color={textToggle['pro'] ? '#CD0244' : 'black'}
              cursor={'pointer'}
              onClick={(e) => {
                changeTextToggle(e.target.id)
                navigate(`${pathName}?pa=${pageValue}&cat=pro&mo=jan`)
              }}
            >
              Product
            </Text>
          </HStack>
          <ReportTable
            categoryValue={categoryValue}
            warehouseId={warehouseId}
            pageValue={pageValue}
            startDate={startDate}
            endDate={endDate}
          />
        </VStack>
      </Flex>
    </Box>
  )
}

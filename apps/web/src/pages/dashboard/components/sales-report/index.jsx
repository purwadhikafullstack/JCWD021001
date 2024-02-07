import {
  Box,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useStepContext,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReportTable } from './component/table'
import { getMonthDates } from './services/utils'
import { MonthSelect } from './component/month-select'
import {
  getAbbreviatedMonth,
  getCurrentYear,
  getFirstDateOfMonthByAbbreviation,
} from './component/month-select/utils/services'

export const SalesReport = () => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(5)

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

  const [month, setMonth] = useState(
    getFirstDateOfMonthByAbbreviation(monthValue, getCurrentYear()),
  )

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    setStartDate(getMonthDates(new Date(month)).startDate)
    setEndDate(getMonthDates(new Date(month)).endDate)
  }, [categoryValue, month])

  return (
    <Box p={'1em'} h={'100%'} w={'100%'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Heading as={'h1'} fontSize={'1.5em'}>
              Sales Report
            </Heading>
            <MonthSelect
              monthValue={monthValue}
              setMonth={setMonth}
              pathName={pathName}
              pageValue={pageValue}
              categoryValue={categoryValue}
            />
          </Flex>
          <HStack fontWeight={'bold'} spacing={'1.5em'}>
            <Text
              id={'all'}
              borderBottom={textToggle['all'] ? '3px solid #CD0244' : 'none'}
              color={textToggle['all'] ? '#CD0244' : 'black'}
              cursor={'pointer'}
              onClick={(e) => {
                changeTextToggle(e.target.id)
                navigate(`${pathName}?pa=${pageValue}&cat=all&mo=${monthValue}`)
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
                navigate(`${pathName}?pa=${pageValue}&cat=cat&mo=${monthValue}`)
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
                navigate(`${pathName}?pa=${pageValue}&cat=pro&mo=${monthValue}`)
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

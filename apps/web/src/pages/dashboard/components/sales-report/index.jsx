import { Box, Flex, HStack, Heading, Select, Text, VStack, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReportTable } from './component/table'
import { getMonthDates } from './services/utils'
import { MonthSelect } from './component/month-select'
import {
  getCurrentYear,
  getFirstDateOfMonthByAbbreviation,
} from './component/month-select/utils/services'
import { getWarehouses } from '../form-mutation/services/readWarehouse'
import { PaginationList } from '../product-list/components/pagination-list'

export const SalesReport = (props) => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(props?.user?.warehouseId)

  const warehouseValue = queryParams.get('war')

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
        selected={warehouse?.id === +warehouseValue}
      >
        {warehouse?.WarehouseAddress?.location}
      </option>
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
            <Heading
              as={'h1'}
              fontSize={{ base: '1em', md: '1.5em' }}
              fontWeight={'bold'}
              justifyContent={'space-between'}
            >
              Sales Report
            </Heading>
            <HStack>
              {props?.isSuperAdmin && (
                <Select
                  w={'10em'}
                  placeholder={'Select warehouse'}
                  id={'recipientWarehouseAddress'}
                  name={'recipientWarehouseAddress'}
                  type={'text'}
                  bg={'white'}
                  border={'1px solid lightgray'}
                  focusBorderColor={'lightgray'}
                  onChange={async (e) => {
                    setWarehouseId(e?.target?.value)
                    {
                      e?.target?.value
                        ? navigate(
                            `${pathName}?pa=1&cat=${categoryValue}&mo=${monthValue}&war=${e?.target?.value}`,
                          )
                        : navigate(
                            `${pathName}?pa=1&cat=${categoryValue}&mo=${monthValue}${
                              warehouseValue ? `&war=${0}` : `&war=0`
                            }`,
                          )
                    }
                  }}
                >
                  {warehouseOptions}
                </Select>
              )}
              <MonthSelect
                isSuperAdmin={props?.isSuperAdmin}
                warehouseValue={warehouseValue}
                warValue={warehouseValue}
                monthValue={monthValue}
                setMonth={setMonth}
                pathName={pathName}
                pageValue={pageValue}
                categoryValue={categoryValue}
              />
            </HStack>
          </Flex>
          <HStack fontWeight={'bold'} spacing={'1.5em'}>
            <Text
              id={'all'}
              borderBottom={textToggle['all'] ? '3px solid #CD0244' : 'none'}
              color={textToggle['all'] ? '#CD0244' : 'black'}
              cursor={'pointer'}
              onClick={(e) => {
                changeTextToggle(e.target.id)
                navigate(
                  `${pathName}?pa=${pageValue}&cat=all&mo=${monthValue}${
                    props?.isSuperAdmin ? `&war=${warehouseValue}` : ''
                  }`,
                )
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
                navigate(
                  `${pathName}?pa=${pageValue}&cat=cat&mo=${monthValue}${
                    props?.isSuperAdmin ? `&war=${warehouseValue}` : ''
                  }`,
                )
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
                navigate(
                  `${pathName}?pa=${pageValue}&cat=pro&mo=${monthValue}${
                    props?.isSuperAdmin ? `&war=${warehouseValue}` : ''
                  }`,
                )
              }}
            >
              Product
            </Text>
          </HStack>
          <ReportTable
            user={props?.user}
            isSuperAdmin={props?.isSuperAdmin}
            categoryValue={categoryValue}
            warehouseValue={warehouseValue}
            warehouseId={warehouseId}
            pageValue={pageValue}
            startDate={startDate}
            endDate={endDate}
          />
        </VStack>
        <PaginationList
          boxToggle={boxToggle}
          changeBoxToggle={changeBoxToggle}
          location={location}
          pathName={pathName}
          pageValue={pageValue}
          warValue={warehouseValue}
          monthValue={monthValue}
          categoryValue={categoryValue}
        />
      </Flex>
    </Box>
  )
}

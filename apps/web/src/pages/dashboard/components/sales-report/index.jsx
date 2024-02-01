import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getOrders } from './services/readOrders'
import toRupiah from '@develoka/angka-rupiah-js'

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

  const [textToggle, setTextToggle] = useState({ [categoryValue]: true })

  const changeTextToggle = (id) => {
    if (id !== categoryValue)
      setTextToggle((set) => ({
        [id]: !set[id],
        [!id]: set[id],
      }))
  }

  const [orders, setOrders] = useState([])

  function getMonthDates(inputDate) {
    if (!(inputDate instanceof Date) || isNaN(inputDate)) {
      throw new Error('Invalid Date')
    }

    inputDate.setDate(1)

    inputDate.setUTCHours(0, 0, 0, 0)

    const endDate = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0)

    const formattedStartDate = inputDate.toISOString().split('T')[0]
    const formattedEndDate = endDate.toISOString().split('T')[0]

    return { startDate: formattedStartDate, endDate: formattedEndDate }
  }

  const today = new Date('2024-03-02')

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    setStartDate(getMonthDates(today).startDate)
    setEndDate(getMonthDates(today).endDate)
    getOrders(Number(pageValue), startDate, endDate).then((data) => {
      setOrders(data)
    })
  }, [])

  const renderedTableBody = orders?.map((order, index) => {
    const timestamp = order?.orderDate
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
      <Tr key={index}>
        <Td>{formattedDate}</Td>
        <Td>{toRupiah(order?.totalPrice)}</Td>
        <Td>
          <HStack>
            <Button
              _hover={{
                bgColor: 'redPure.600',
              }}
              fontSize={'.8em'}
              h={'2.5em'}
              w={'5em'}
              bgColor={'redPure.600'}
              color={'white'}
              onClick={() => {}}
            >
              Download
            </Button>
            <Button
              _hover={{
                bgColor: 'redPure.600',
              }}
              fontSize={'.8em'}
              h={'2.5em'}
              w={'5em'}
              bgColor={'redPure.600'}
              color={'white'}
              onClick={() => {}}
            >
              Print
            </Button>
          </HStack>
        </Td>
      </Tr>
    )
  })
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
                      Date
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Total Sales
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

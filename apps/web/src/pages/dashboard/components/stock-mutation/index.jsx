import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Select,
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
import { getMutations } from './services/readMutation'
import { approveMutation } from './services/createMutation'
import { PaginationList } from '../product-list/components/pagination-list'
import { ApproveButton } from './component/approve-button'
import { RejectButton } from './component/reject-button'
import { getWarehouses } from '../form-mutation/services/readWarehouse'

export const StockMutation = (props) => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const warehouseValue = queryParams.get('wa')
  // WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(0)
  const [requesterWarehouseId, setRequesterWarehouseId] = useState(0)
  const [recipientWarehouseId, setRecipientWarehouseId] = useState(0)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')
  const filterValue = queryParams.get('sta')

  // HANDLE REQUEST APPROVAL
  const handleRequestApproval = (filterValue) => {
    if (filterValue === 'req') {
      setRequesterWarehouseId(warehouseId)
      setRecipientWarehouseId('')
    } else if (filterValue === 'app') {
      setRequesterWarehouseId('')
      setRecipientWarehouseId(warehouseId)
    }
  }

  // PATHNAME
  const pathName = location.pathname

  // NAVIGATE
  const navigate = useNavigate()

  // TOAST
  const toast = useToast()

  //   MUTATIONS
  const [mutations, setMutations] = useState([])

  // CONST HANDLE RECIPIENT
  const [isJuragan, setIsJuragan] = useState(false)
  const handleJuragan = (recipientWarehouseId, warehouseId) => {
    if (recipientWarehouseId === warehouseId) {
      setIsJuragan(true)
    } else {
      setIsJuragan(false)
    }
  }

  // HANDLE APPROVE
  const handleApprove = async (mutationId, isAccepted) => {
    try {
      const res = await approveMutation(mutationId, isAccepted)
      toast({
        title: `${res?.data?.message}`,
        status: 'success',
        placement: 'bottom',
      })
    } catch (err) {
      toast({
        title: `${err?.message}`,
        status: 'error',
      })
    }
  }

  // TABLE BODY
  // Toggle Box Colour
  const [boxToggle, setBoxToggle] = useState({ [pageValue]: true })

  // Handle Toggle
  const changeBoxToggle = (id) => {
    if (pageValue == 1) {
      setBoxToggle({ [pageValue]: true })
    } else {
      setBoxToggle((set) => ({
        [id]: true,
        [!id]: false,
      }))
    }
  }
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    changeBoxToggle(pageValue)
    handleJuragan(recipientWarehouseId, warehouseId)
    handleRequestApproval(filterValue)
    if (props?.isSuperAdmin) {
      setWarehouseId(warehouseValue)
      getMutations(warehouseId, recipientWarehouseId, pageValue, 10).then((data) => {
        setMutations(data)
      })
    }
    if (!props?.isSuperAdmin) {
      setWarehouseId(props?.user?.warehouseId)
      getMutations(requesterWarehouseId, recipientWarehouseId, pageValue, 10).then((data) => {
        setMutations(data)
      })
    }
  }, [
    pageValue,
    filterValue,
    requesterWarehouseId,
    recipientWarehouseId,
    warehouseId,
    trigger,
    warehouseValue,
  ])
  console.log('stock-mutation', mutations)
  const renderedTableBody = mutations?.rows?.map((mutation, index) => {
    return (
      <Tr key={index} cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'}>
        <Td>{mutation?.id}</Td>
        <Td>{mutation?.requester?.name}</Td>
        <Td>{mutation?.recipient?.name}</Td>
        <Td>{mutation?.stock?.product?.name}</Td>
        <Td>{mutation?.qty}</Td>
        <Td>
          <HStack>
            <Button
              _hover={{
                bgColor: 'transparent',
              }}
              fontSize={'.8em'}
              h={'2.5em'}
              w={'5em'}
              border={'1px solid #CD0244'}
              bgColor={'transparent'}
              color={'redPure.600'}
            >
              {isJuragan
                ? +mutation?.isAccepted === 1
                  ? 'Accepted'
                  : mutation?.isAccepted === 0 && mutation?.isAccepted !== null
                    ? 'Rejected'
                    : mutation?.isAccepted === null
                      ? 'Waiting'
                      : 'Rejected'
                : +mutation?.isAccepted === 1
                  ? 'Accepted'
                  : mutation?.isAccepted === null
                    ? 'Waiting'
                    : 'Rejected'}
            </Button>
            <ApproveButton
              filterValue={filterValue}
              mutation={mutation}
              isJuragan={isJuragan}
              handleApprove={handleApprove}
              trigger={trigger}
              setTrigger={setTrigger}
            />
            <RejectButton
              filterValue={filterValue}
              mutation={mutation}
              isJuragan={isJuragan}
              handleApprove={handleApprove}
              trigger={trigger}
              setTrigger={setTrigger}
            />
          </HStack>
        </Td>
      </Tr>
    )
  })
  // Toggle Box Colour
  const [textToggle, setTextToggle] = useState({ Request: true })
  // Handle Toggle
  const changeTextToggle = (id) => {
    if (filterValue !== id) {
      setTextToggle((set) => ({
        [id]: true,
        [!id]: false,
      }))
    }
  }
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
  return (
    <Box p={'1em'} h={'100%'} w={'100%'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Heading
              as={'h1'}
              fontSize={{ base: '1em', md: '1.5em' }}
              fontWeight={'bold'}
              justifyContent={'space-between'}
            >
              Stock Mutation
            </Heading>
            <HStack>
              {props?.isSuperAdmin && (
                <Select
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
                        ? navigate(`${pathName}?pa=1&wa=${e?.target?.value}`)
                        : navigate(`${pathName}?pa=1`)
                    }
                  }}
                >
                  {warehouseOptions}
                </Select>
              )}
              <Button
                _hover={{
                  bgColor: 'redPure.600',
                }}
                h={'2.5em'}
                w={'10em'}
                bgColor={'redPure.600'}
                color={'white'}
                onClick={() => {
                  navigate(
                    `/dashboard/stock-mutation/form-mutation?pa=1${
                      warehouseValue ? `&wa=${warehouseValue}` : ''
                    }`,
                  )
                }}
              >
                Form Mutation
              </Button>
            </HStack>
          </Flex>
          <HStack fontWeight={'bold'} spacing={'1.5em'}>
            <Text
              id={'req'}
              borderBottom={
                textToggle[document.getElementById('req')?.innerText] ? '3px solid #CD0244' : 'none'
              }
              color={textToggle[document.getElementById('req')?.innerText] ? '#CD0244' : 'black'}
              cursor={'pointer'}
              onClick={() => {
                changeTextToggle(document.getElementById('req')?.innerText)
                navigate(
                  `${pathName}?pa=${pageValue}&sta=req${
                    warehouseValue ? `&wa=${warehouseValue}` : ''
                  }`,
                )
                handleRequestApproval(filterValue)
              }}
            >
              Request
            </Text>
            <Text
              id={'app'}
              borderBottom={
                textToggle[document.getElementById('app')?.innerText] ? '3px solid #CD0244' : 'none'
              }
              color={textToggle[document.getElementById('app')?.innerText] ? '#CD0244' : 'black'}
              cursor={'pointer'}
              onClick={() => {
                changeTextToggle(document.getElementById('app')?.innerText)
                navigate(
                  `${pathName}?pa=${pageValue}&sta=app${
                    warehouseValue ? `&wa=${warehouseValue}` : ''
                  }`,
                )
                handleRequestApproval(filterValue)
              }}
            >
              Approval
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
                      Id Mutation
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Warehouse Origin
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Warehouse Destination
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                      Products
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'} w={'10em'}>
                      Qty
                    </Th>
                    <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'} w={'10em'}>
                      Action
                    </Th>
                  </Tr>
                </Thead>
                <Tbody fontWeight={'bold'} position={'relative'}>
                  {renderedTableBody}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
        <PaginationList
          mutValue={warehouseValue}
          boxToggle={boxToggle}
          changeBoxToggle={changeBoxToggle}
          location={location}
          pathName={pathName}
          pageValue={pageValue}
          filterValue={filterValue}
        />
      </Flex>
    </Box>
  )
}

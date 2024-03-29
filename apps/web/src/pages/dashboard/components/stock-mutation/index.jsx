import {
  Box,
  Button,
  Flex,
  HStack,
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

export const StockMutation = (props) => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(props?.user?.warehouseId)
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
    setWarehouseId(props?.user?.warehouseId)
    if (warehouseId) {
      getMutations(requesterWarehouseId, recipientWarehouseId, pageValue, 10).then((data) => {
        setMutations(data)
      })
    }
  }, [pageValue, filterValue, requesterWarehouseId, recipientWarehouseId, warehouseId, trigger])
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

  return (
    <Box p={'1em'} h={'100%'} w={'100%'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'}>Stock Mutation</Text>
            <Button
              _hover={{
                bgColor: 'redPure.600',
              }}
              h={'3em'}
              w={'10em'}
              bgColor={'redPure.600'}
              color={'white'}
              onClick={() => {
                navigate('/dashboard/stock-mutation/form-mutation?pa=1')
              }}
            >
              Form Mutation
            </Button>
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
                navigate(`${pathName}?pa=${pageValue}&sta=req`)
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
                navigate(`${pathName}?pa=${pageValue}&sta=app`)
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

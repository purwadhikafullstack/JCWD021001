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

export const StockMutation = () => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(5)
  const [requesterWarehouseId, setRequesterWarehouseId] = useState(0)
  const [recipientWarehouseId, setRecipientWarehouseId] = useState(0)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')
  const filterValue = queryParams.get('sta')

  // HANDLE REQUEST APPROVAL
  const handleRequestApproval = (filterValue) => {
    if (filterValue === 'app') {
      setRequesterWarehouseId(warehouseId)
      setRecipientWarehouseId('')
    } else {
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

  useEffect(() => {
    getMutations(requesterWarehouseId, recipientWarehouseId, pageValue, 10).then((data) => {
      setMutations(data)
    })
    handleJuragan(recipientWarehouseId, warehouseId)
  }, [pageValue, filterValue])

  console.log('IS JURAGAN', isJuragan)
  // HANDLE APPROVE
  const handleApprove = async (mutationId) => {
    try {
      const res = await approveMutation(mutationId)
      toast({
        title: `${res?.data?.title}`,
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
  const renderedTableBody = mutations?.rows?.map((mutation, index) => {
    return (
      <Tr key={index}>
        <Td>{mutation?.id}</Td>
        <Td>{mutation?.requester?.address}</Td>
        <Td>{mutation?.recipient?.address}</Td>
        <Td>{mutation?.stock?.product?.name}</Td>
        <Td>{mutation?.qty}</Td>
        <Td>
          <Button
            _hover={{
              bgColor: 'transparent',
            }}
            w={'5em'}
            border={'1px solid #e3024b'}
            bgColor={'transparent'}
            color={'redPure.500'}
            onClick={() => {
              isJuragan ? handleApprove(mutation?.id) : null
            }}
          >
            {isJuragan
              ? mutation?.isAccepted
                ? 'Accepted'
                : 'Approve'
              : mutation?.isAccepted
                ? 'History'
                : 'Waiting'}
          </Button>
        </Td>
      </Tr>
    )
  })

  return (
    <Box p={'1em'} h={'100%'} w={'100%'}>
      <Flex flexDir={'column'} justifyContent={'space-between'} h={'100%'}>
        <VStack align={'stretch'}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Text fontWeight={'bold'}>Stock Mutation</Text>
            <Button
              _hover={{
                bgColor: 'redPure.500',
              }}
              w={'10em'}
              bgColor={'redPure.500'}
              color={'white'}
              onClick={() => {
                navigate('/dashboard/stock-management/create-stock')
              }}
            >
              Form Mutation
            </Button>
          </Flex>
          <HStack>
            <Text
              onClick={async () => {
                navigate(`${pathName}?pa=${pageValue}&sta=req`)
                handleRequestApproval(filterValue)
              }}
            >
              Request
            </Text>
            <Text
              onClick={async () => {
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
                <Thead bg={'redPure.500'} position={'relative'}>
                  <Tr>
                    <Th color={'#FEFEFE'}>ID MUTATION</Th>
                    <Th color={'#FEFEFE'}>Warehouse Origin</Th>
                    <Th color={'#FEFEFE'}>Warehouse Destination</Th>
                    <Th color={'#FEFEFE'}>Products</Th>
                    <Th color={'#FEFEFE'} w={'10em'}>
                      Qty
                    </Th>
                    <Th color={'#FEFEFE'} w={'10em'}>
                      Action
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

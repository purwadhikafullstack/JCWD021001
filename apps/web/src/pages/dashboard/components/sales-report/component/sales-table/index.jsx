import {
  Box,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import toRupiah from '@develoka/angka-rupiah-js'
import { useEffect, useState } from 'react'
import { getOrders } from '../../services/readOrders'

export const SalesTable = (props) => {
  const [data, setData] = useState([])
  {
    console.log('props?.user?.warehouseId', props?.user?.warehouseId)
  }
  useEffect(() => {
    if (props?.isSuperAdmin) {
      getOrders(props?.pageValue, props?.warehouseValue, props?.startDate, props?.endDate).then(
        (data) => setData(data),
      )
    }
    if (!props?.isSuperAdmin) {
      getOrders(props?.pageValue, props?.user?.warehouseId, props?.startDate, props?.endDate).then(
        (data) => setData(data),
      )
    }
  }, [props?.startDate, props?.warehouseValue, props?.user?.warehouseId])

  const renderedTableBody = data?.map((order, index) => {
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
    })?.format(dateObject)
    return (
      <Tr key={index} cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'}>
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
  )
}

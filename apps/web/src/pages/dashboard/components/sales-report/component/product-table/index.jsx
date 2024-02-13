import {
  Box,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import toRupiah from '@develoka/angka-rupiah-js'
import { useEffect, useState } from 'react'
import { getOrders, getOrdersByProduct } from '../../services/readOrders'

export const ProductTable = (props) => {
  const [data, setData] = useState([])

  useEffect(() => {
    getOrdersByProduct(
      props?.pageValue,
      10,
      props?.warehouseId,
      props?.startDate,
      props?.endDate,
    ).then((data) => setData(data))
  }, [props?.startDate])
  const renderedTableBody = data?.map((order, index) => {
    return (
      <Tr key={index} cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'}>
        <Td>{order?.name}</Td>
        <Td>{toRupiah(order?.total)}</Td>
      </Tr>
    )
  })
  return (
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
                Date
              </Th>
              <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                Total Sales
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

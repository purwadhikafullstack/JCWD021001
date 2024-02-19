import { Box, HStack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import toRupiah from '@develoka/angka-rupiah-js'
import { useEffect, useState } from 'react'
import { getOrders } from '../../services/readOrders'

export const SalesTable = (props) => {
  const [data, setData] = useState([])

  useEffect(() => {
    if (props?.isSuperAdmin) {
      getOrders(
        props?.pageValue,
        props?.warehouseValue || 0,
        props?.startDate,
        props?.endDate,
      ).then((data) => setData(data))
    }
    if (!props?.isSuperAdmin) {
      getOrders(props?.pageValue, props?.user?.warehouseId, props?.startDate, props?.endDate).then(
        (data) => setData(data),
      )
    }
  }, [props?.startDate, props?.warehouseValue, props?.user?.warehouseId, props?.pageValue])

  const renderedTableBody = data[0]?.map((order, index) => {
    return (
      <Tr key={index} cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'}>
        <Td>{toRupiah(order?.TotalSales || 0)}</Td>
        <Td>{order?.TotalQuantity}</Td>
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
                Total Sales
              </Th>
              <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                Item Sold
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

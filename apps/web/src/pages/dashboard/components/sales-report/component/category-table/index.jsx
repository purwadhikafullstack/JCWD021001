import {
  Box,
  HStack,
  Icon,
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
import { getOrdersByCategory } from '../../services/readOrders'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

export const CategoryTable = (props) => {
  const [data, setData] = useState([])

  useEffect(() => {
    if (props?.isSuperAdmin) {
      getOrdersByCategory(props?.warehouseValue, props?.startDate, props?.endDate).then((data) => {
        setData(data)
      })
    }
    if (!props?.isSuperAdmin) {
      getOrdersByCategory(props?.warehouseId, props?.startDate, props?.endDate).then((data) => {
        setData(data)
      })
    }
  }, [props?.startDate, props?.warehouseValue])
  const renderedTableBody = data?.map((data, index) => {
    return (
      <Tr key={index} cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'}>
        <Td>
          <HStack>
            <Text>{data?.grandparent_name}</Text>
            <Icon as={ChevronRightIcon} />
            <Text>{data?.group_name}</Text>
            <Icon as={ChevronRightIcon} />
            <Text>{data?.child}</Text>
          </HStack>
        </Td>
        <Td>{toRupiah(data?.total)}</Td>
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
                Category
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

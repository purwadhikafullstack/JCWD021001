import {
  Box,
  Input,
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
} from '@chakra-ui/react'

export const StockSelection = (props) => {
  return (
    <VStack align={'stretch'}>
      <Text>Stock</Text>
      <Box
        h={'7em'}
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
                <Th color={'#FEFEFE'}>Size</Th>
                <Th color={'#FEFEFE'}>Colour</Th>
                <Th color={'#FEFEFE'} w={'10em'}>
                  Stock
                </Th>
              </Tr>
            </Thead>
            <Tbody position={'relative'} color={'#6D6D6D'} fontWeight={'500'}>
              <Tr cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'}>
                <Td>
                  <Select
                    w={'8em'}
                    placeholder={'Select Size'}
                    onChange={(e) => {
                      props?.setSizeId(e.target.value)
                    }}
                  >
                    {props?.sizes?.map((size, index) => {
                      return (
                        <option key={index} value={size?.id}>
                          {size?.name}
                        </option>
                      )
                    })}
                  </Select>
                </Td>
                <Td>
                  <Select
                    w={'6em'}
                    placeholder={'Select Colour'}
                    onChange={(e) => {
                      props?.setColourId(e.target.value)
                    }}
                  >
                    {props?.colours?.map((colour, index) => {
                      return (
                        <option key={index} id={colour?.id} value={colour?.id}>
                          {colour?.name}
                        </option>
                      )
                    })}
                  </Select>
                </Td>
                <Td alignItems={'center'}>
                  <Input
                    w={'3.5em'}
                    type="number"
                    value={props?.stockValue}
                    onFocus={() => {}}
                    onChange={(e) => props?.setStockValue(e.target.value)}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </VStack>
  )
}

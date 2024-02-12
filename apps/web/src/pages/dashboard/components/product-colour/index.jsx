import {
  Box,
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
import { getColours } from '../create-stock/services/readColour'
import { DeleteButton } from './component/delete-button'

export const ProductColour = (props) => {
  const [colours, setColours] = useState([])

  useEffect(() => {
    getColours().then((data) => setColours(data))
  }, [])

  const toast = useToast()
  return (
    <Box height={'100%'} w={'100%'} minH={'100vh'}>
      <VStack align={' stretch'}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Heading
            as={'h1'}
            fontSize={{ base: '1em', md: '1.5em' }}
            fontWeight={'bold'}
            justifyContent={'space-between'}
          >
            Product Colour
          </Heading>
        </Flex>
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
                    Product Colour Name
                  </Th>
                  <Th color={'#FEFEFE'} w={'10em'} textTransform={'none'} fontSize={'1em'}>
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody position={'relative'} fontWeight={'bold'}>
                {colours?.map((colour, index) => {
                  return (
                    <Tr key={index} cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'}>
                      <Td>
                        <Text>{colour?.name}</Text>
                      </Td>
                      <Td alignItems={'center'}>
                        <HStack>
                          {props?.isSuperAdmin && <DeleteButton id={colour?.id} toast={toast} />}
                        </HStack>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </Box>
  )
}

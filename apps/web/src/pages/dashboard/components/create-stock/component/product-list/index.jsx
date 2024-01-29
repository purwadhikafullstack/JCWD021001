import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
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
import { SearchInput } from '../search-input'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const ProductList = (props) => {
  return (
    <VStack p={'1em '} border={'1px solid lightgray'} borderRadius={'.5em'} align={'stretch'}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={'bold'}>Product</Text>
        <Box>
          <SearchInput setProductNameFilter={props?.setProductNameFilter} />
        </Box>
      </Flex>
      <Box
        h={'20em'}
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
                <Th color={'#FEFEFE'}>Products</Th>
                <Th color={'#FEFEFE'}>Category</Th>
                <Th color={'#FEFEFE'} w={'10em'}>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody position={'relative'} color={'#6D6D6D'} fontWeight={'500'}>
              {props?.products?.rows?.map((product, index) => {
                return (
                  <Tr cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'} key={index}>
                    <Td textAlign={'center'}>
                      <HStack spacing={'1.5em'}>
                        <AspectRatio h={'3em'} w={'3em'} ratio={1}>
                          <Image
                            src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/productImages/${
                              product?.picture[0]?.imageUrl
                            }`}
                            objectFit={'cover'}
                          />
                        </AspectRatio>
                        <Text>{product?.name}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <HStack mb={'1em'}>
                        <Text>{product?.category?.parent?.parent?.name}</Text>
                        <Icon as={ChevronRightIcon} />
                        <Text>{product?.category?.parent?.name}</Text>
                        <Icon as={ChevronRightIcon} />
                        <Text>{product?.category?.name}</Text>
                      </HStack>
                    </Td>
                    <Td textAlign={'center'} alignItems={'center'}>
                      <Button
                        _hover={{
                          bgColor: 'redPure.500',
                        }}
                        w={'5em'}
                        bgColor={'redPure.500'}
                        color={'white'}
                        onClick={() => {
                          props?.setProductId(product?.id)
                          props?.setProductName(product?.name)
                          props?.setProductSelected(product)
                        }}
                      >
                        Choose
                      </Button>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </VStack>
  )
}

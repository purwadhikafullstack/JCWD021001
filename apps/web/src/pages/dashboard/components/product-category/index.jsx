import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
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
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProductCategory = (props) => {
  // NAVIGATE
  const navigate = useNavigate()
  // NAVIGATE
  //   GENDER
  const [gender, setGender] = useState([])
  const getGender = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/product-category/gender`)
      setGender(res?.data?.data)
    } catch (err) {
      throw err
    }
  }
  useEffect(() => {
    getGender()
  }, [])
  //   GENDER
  return (
    <Box p={'1em'}>
      <VStack align={' stretch'}>
        <Flex justifyContent={'space-between'}>
          <Text>Product Category</Text>
          <Button
            _hover={{
              bgColor: 'redPure.500',
            }}
            w={'10em'}
            bgColor={'redPure.500'}
            color={'white'}
            onClick={() => {
              navigate('/dashboard/product-list/create-product-category')
            }}
          >
            Create Category
          </Button>
        </Flex>
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
                <Th color={'#FEFEFE'} textAlign={'center'}>
                  Product Category Name
                </Th>
                <Th color={'#FEFEFE'} textAlign={'center'} w={'10em'}>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody position={'relative'} color={'#6D6D6D'} fontWeight={'500'}>
              {gender?.map((el, index) => {
                return (
                  <Tr cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'} key={index}>
                    <Td textAlign={'center'}>
                      <Text>{el?.name}</Text>
                    </Td>
                    <Td textAlign={'center'} alignItems={'center'}>
                      <HStack>
                        <Button
                          _hover={{
                            bgColor: 'redPure.500',
                          }}
                          w={'5em'}
                          bgColor={'redPure.500'}
                          color={'white'}
                          onClick={() => {
                            navigate(
                              `/dashboard/product-category/edit-product-category/${el?.name?.toLowerCase()}`,
                            )
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          _hover={{
                            bgColor: 'transparent',
                          }}
                          w={'5em'}
                          border={'1px solid #e3024b'}
                          bgColor={'transparent'}
                          color={'redPure.500'}
                          onClick={() => {}}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Box>
  )
}

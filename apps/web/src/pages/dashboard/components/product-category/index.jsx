import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
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
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Heading as={'h1'} fontSize={'1.5em'}>
            Product Category
          </Heading>
          <Button
            h={'3em'}
            w={'10em'}
            _hover={{
              bgColor: 'redPure.600',
            }}
            bgColor={'redPure.600'}
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
            <Thead bg={'redPure.600'} position={'relative'}>
              <Tr>
                <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                  Product Category Name
                </Th>
                <Th color={'#FEFEFE'} w={'10em'} textTransform={'none'} fontSize={'1em'}>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody position={'relative'} fontWeight={'bold'}>
              {gender?.map((el, index) => {
                return (
                  <Tr cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'} key={index}>
                    <Td>
                      <Text>{el?.name}</Text>
                    </Td>
                    <Td alignItems={'center'}>
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
                          fontSize={'.8em'}
                          h={'2.5em'}
                          w={'5em'}
                          border={'1px solid #CD0244'}
                          bgColor={'transparent'}
                          color={'redPure.600'}
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

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
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteProductCategory } from '../edit-product-category/services/deleteProductCategory'
import { API_ROUTE } from '../../../../services/route'
import { EditButton } from './component/edit-button'
import { DeleteButton } from './component/delete-button'

export const ProductCategory = (props) => {
  // Navigate
  const navigate = useNavigate()

  // Toast
  const toast = useToast()

  //   GENDER
  const [gender, setGender] = useState([])
  const getGender = async () => {
    try {
      const res = await axios.get(`${API_ROUTE}/product-category/gender`)
      setGender(res?.data?.data)
    } catch (err) {
      throw err
    }
  }
  useEffect(() => {
    getGender()
  }, [])

  console.log('product-category', props)
  return (
    <Box p={'1em'}>
      <VStack align={' stretch'}>
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Heading as={'h1'} fontSize={'1.5em'}>
            Product Category
          </Heading>
          {props?.isSuperAdmin && (
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
          )}
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
                        {props?.isSuperAdmin && <EditButton name={el?.name} navigate={navigate} />}
                        {props?.isSuperAdmin && <DeleteButton id={el?.id} toast={toast} />}
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

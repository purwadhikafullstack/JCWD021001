import {
  Box,
  Button,
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
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteProductCategory } from '../edit-product-category/services/deleteProductCategory'
import { API_ROUTE } from '../../../../services/route'
import { EditButton } from './component/edit-button'
import { DeleteButton } from './component/delete-button'
import { ViewButton } from '../edit-product-category/component/button'

export const ProductCategory = (props) => {
  // Navigate
  const navigate = useNavigate()

  // Toast
  const toast = useToast()

  //   GENDER
  const [gender, setGender] = useState([])
  const getGender = async () => {
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get(`${API_ROUTE}/product-category/gender`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setGender(res?.data?.data)
    } catch (err) {
      throw err
    }
  }
  useEffect(() => {
    getGender()
  }, [])

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
            Product Category
          </Heading>
          {props?.isSuperAdmin && (
            <Button
              h={'2.5em'}
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
                          {props?.isSuperAdmin && (
                            <EditButton name={el?.name} navigate={navigate} />
                          )}
                          {props?.isSuperAdmin && <DeleteButton id={el?.id} toast={toast} />}
                          {props?.user?.warehouseId && <ViewButton name={el?.name} />}
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

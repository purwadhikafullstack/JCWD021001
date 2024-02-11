import {
  Table,
  TableContainer,
  Td,
  Thead,
  Tr,
  Text,
  Tbody,
  Box,
  Icon,
  Button,
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { SortName, SortWarehouseCity } from '../sort-warehouse'
import DeleteWarehouse from '../delete-warehouse'
import WarehouseAdmin from '../warehouse-admin-list'
import { ChevronDownIcon } from '@chakra-ui/icons'
import AssignAdmin from '../assign-admin'
import { useEffect, useState } from 'react'
import { getWarehouseAdmin } from '../../services/getWarehouseList'
import { Link, useNavigate } from 'react-router-dom'

function TableWarehouse({ warehouse, onWarehouseUpdated, setSortField, setSortOrder }) {
  const navigate = useNavigate()
  
  return (
    <>
      <TableContainer maxWidth={'1163px'} borderRadius={'8px'}>
        <Table size={{base: 'sm', md:'md'}}>
          <Thead bgColor={'#CD0244'}>
            <Tr>
              <Td padding={'8px 8px 8px 16px'}>
                <Flex align={'center'} gap={'10px'}>
                  <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>
                    Name
                  </Text>
                  <SortName
                    onWarehouseUpdated={onWarehouseUpdated}
                    setSortField={setSortField}
                    setSortOrder={setSortOrder}
                  />
                </Flex>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>
                  Location
                </Text>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>
                  Province
                </Text>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Flex align={'center'} gap={'10px'}>
                  <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>
                    City
                  </Text>
                  <SortWarehouseCity
                    onWarehouseUpdated={onWarehouseUpdated}
                    setSortField={setSortField}
                    setSortOrder={setSortOrder}
                  />
                </Flex>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>
                  Admin Management
                </Text>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>
                  Action
                </Text>
              </Td>
            </Tr>
          </Thead>
          <Tbody fontSize={'14px'}>
            {warehouse?.map((warehouse, index) => (
              <Tr key={warehouse.id} bg={index % 2 === 0 ? '#FFF1F5' : 'white'}>
                <Td padding={'8px 8px 8px 16px'}>{warehouse.name}</Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Text isTruncated>{warehouse.WarehouseAddress?.location}</Text>
                </Td>
                <Td maxW={'250px'} padding={'8px 8px 8px 16px'}>
                  {warehouse.WarehouseAddress?.City?.Province.name}
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Text>{warehouse.WarehouseAddress?.City?.name}</Text>
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Menu>
                    <MenuButton fontWeight={'700'} color={'brand.lightred'}>
                      Manage Admin <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                      <MenuItem _hover={{ bg: '#FFF1F5' }} _active={{ bg: '#FFF1F5' }}>
                        <WarehouseAdmin warehouseId={warehouse.id} />
                      </MenuItem>
                      <MenuItem _hover={{ bg: '#FFF1F5' }} _active={{ bg: '#FFF1F5' }}>
                        <AssignAdmin warehouseId={warehouse.id} />
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Box display={'flex'} gap={'8px'}>
                  
                    <Button
                      onClick={() => {navigate('/edit-warehouse', {state: {warehouse}})}}
                      bg={'#CD0244'}
                      color={'white'}
                      fontSize={'12px'}
                      fontWeight={'700'}
                      padding={'4px 16px'}
                      w={'72px'}
                      _hover={'none'}
                      _active={'none'}
                    >
                      Edit
                    </Button>
                    {/* <EditWarehouse
                      id={warehouse.id}
                      name={warehouse.name}
                      onWarehouseUpdated={onWarehouseUpdated}
                    /> */}
                    <DeleteWarehouse id={warehouse.id} onDeletedWarehouse={onWarehouseUpdated} />
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableWarehouse

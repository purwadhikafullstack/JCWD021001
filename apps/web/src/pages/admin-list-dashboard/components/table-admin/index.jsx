import {
  Table,
  TableContainer,
  Td,
  Thead,
  Tr,
  Text,
  Tbody,
  Box,
  Avatar,
  Flex,
} from '@chakra-ui/react'
import EditAdmin from '../edit-admin';
import DeleteAdmin from '../deleteAdmin';
import { SortCity, SortEmail, SortRole, SortUserName, SortWarehouse } from '../sort';


function TableAdmin({admin, onAdminUpdated, setSortFiled, setSortOrder}) {

  return (
    <>
      <TableContainer maxWidth={{base: '100vw', md: '80vw'}} borderRadius={'8px'} >
        <Table size={{base: 'sm', md:'md'}}>
          <Thead bgColor={'#CD0244'}>
            <Tr>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>Avatar</Text>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Flex align={'center'} gap={'10px'}>
                  <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>Username</Text>
                  <SortUserName onAdminUpdated={onAdminUpdated} setSortFiled={setSortFiled} setSortOrder={setSortOrder}/>
                </Flex>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Flex align={'center'} gap={'10px'}>
                  <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>Email</Text>
                  <SortEmail onAdminUpdated={onAdminUpdated} setSortFiled={setSortFiled} setSortOrder={setSortOrder}/>
                </Flex>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Flex align={'center'} gap={'10px'}>
                  <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>Warehouse</Text>
                  <SortWarehouse onAdminUpdated={onAdminUpdated} setSortFiled={setSortFiled} setSortOrder={setSortOrder}/>
                </Flex>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>Address</Text>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Flex align={'center'} gap={'10px'}>
                  <Text color={'white'}  fontWeight={'700'} fontSize={'14px'}>City</Text>
                  <SortCity onAdminUpdated={onAdminUpdated} setSortFiled={setSortFiled} setSortOrder={setSortOrder}/>
                </Flex>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Flex align={'center'} gap={'10px'}>
                  <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>Role</Text>
                  <SortRole onAdminUpdated={onAdminUpdated} setSortFiled={setSortFiled} setSortOrder={setSortOrder}/>
                </Flex>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>Action</Text>
              </Td>
            </Tr>
          </Thead>
          <Tbody fontSize={'14px'}>
            {admin?.map((user, index) => (
              <Tr
                key={user.id}
                bg={index % 2 === 0 ? '#FFF1F5' : 'white'}
              >
                <Td>
                {user?.avatar ? (
                      <Avatar
                        name={user?.username}
                        src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/avatar/${user?.avatar}`}
                        w={'48px'}
                        h={'48px'}
                      />
                    ) : (
                      <Avatar
                        name={user?.username}
                        bg="rgba(40, 96, 67, 1)"
                        src={'https://bit.ly/broken-link'}
                        w={'48px'}
                        h={'48px'}
                        color={'white'}
                      />
                    )}
                </Td>
                <Td padding={'8px 8px 8px 16px'}>{user.username}</Td>
                <Td padding={'8px 8px 8px 16px'}>{user.email}</Td>
               
                <Td padding={'8px 8px 8px 16px'}>{user.Warehouse?.name}</Td>
                <Td maxW={'250px'} padding={'8px 8px 8px 16px'}>
                  <Text isTruncated>{user.UserAddresses[0]?.specificAddress}</Text>
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Text>{user.UserAddresses[0]?.City?.name}</Text>
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                {user.roleId === 2 ? "Admin" : user.roleId === 1 ? "Superadmin" : ""}
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Box display={'flex'} gap={'8px'}>
                    <EditAdmin id={user.id} username={user.username} email={user.email} roleId={user.roleId} onAdminUpdated={onAdminUpdated}/>
                    <DeleteAdmin id={user.id} onDeletedAdmin={onAdminUpdated}/>
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

export default TableAdmin

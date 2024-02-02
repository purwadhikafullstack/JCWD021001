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
} from '@chakra-ui/react'
import EditAdmin from '../edit-admin';
import DeleteAdmin from '../deleteAdmin';

function TableAdmin({admin, onAdminUpdated}) {
  console.log(admin);
  return (
    <>
      <TableContainer display={{ base: 'none', xl: 'block' }} borderRadius={'8px'}>
        <Table>
          <Thead bgColor={'#CD0244'}>
            <Tr>
              <Td>
                <Text color={'white'} fontWeight={'700'}>Avatar</Text>
              </Td>
              <Td>
                <Text color={'white'} fontWeight={'700'}>Username</Text>
              </Td>
              <Td>
                <Text color={'white'} fontWeight={'700'}>Email</Text>
              </Td>
              <Td>
                <Text color={'white'} fontWeight={'700'}>Warehouse</Text>
              </Td>
              <Td>
                <Text color={'white'} fontWeight={'700'}>Address</Text>
              </Td>
              <Td>
                <Text color={'white'}  fontWeight={'700'}>City</Text>
              </Td>
              <Td>
                <Text color={'white'} fontWeight={'700'}>Role</Text>
              </Td>
              <Td>
                <Text color={'white'} fontWeight={'700'}>Action</Text>
              </Td>
            </Tr>
          </Thead>
          <Tbody>
            {admin?.map((user, index) => (
              <Tr
                key={index}
                bg={index % 2 === 0 ? '#FFF1F5' : 'white'}
                // _hover={{ bg: '#FED7E2' }}
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
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
               
                <Td>{user.Warehouses[0]?.name}</Td>
                <Td maxW={'250px'}>
                  <Text isTruncated>{user.UserAddresses[0]?.specificAddress}</Text>
                </Td>
                <Td>
                  <Text>{user.UserAddresses[0]?.City?.name}</Text>
                </Td>
                <Td>
                {user.roleId === 2 ? "Admin" : user.roleId === 1 ? "Superadmin" : ""}
                </Td>
                <Td>
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

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
import EditAdmin from '../edit-user';
import DeleteAdmin from '../deleteUser';
import { SortCity, SortEmail, SortRole, SortUserName } from '../sort';


function TableUser({user, onUserUpdated, setSortFiled, setSortOrder}) {

  return (
    <>
      <TableContainer maxWidth={'1163px'} borderRadius={'8px'}>
        <Table size={{base: 'sm', md:'md'}}>
          <Thead bgColor={'#CD0244'}>
            <Tr>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>Avatar</Text>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Flex align={'center'} gap={'10px'}>
                  <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>Username</Text>
                  <SortUserName onUserUpdated={onUserUpdated} setSortFiled={setSortFiled} setSortOrder={setSortOrder}/>
                </Flex>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Flex align={'center'} gap={'10px'}>
                  <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>Email</Text>
                  <SortEmail onUserUpdated={onUserUpdated} setSortFiled={setSortFiled} setSortOrder={setSortOrder}/>
                </Flex>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>Address</Text>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Flex align={'center'} gap={'10px'}>
                  <Text color={'white'}  fontWeight={'700'} fontSize={'14px'}>City</Text>
                  <SortCity onUserUpdated={onUserUpdated} setSortFiled={setSortFiled} setSortOrder={setSortOrder}/>
                </Flex>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Flex align={'center'} gap={'10px'}>
                  <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>Verification</Text>
                  <SortRole onUserUpdated={onUserUpdated} setSortFiled={setSortFiled} setSortOrder={setSortOrder}/>
                </Flex>
              </Td>
              <Td padding={'8px 8px 8px 16px'}>
                <Text color={'white'} fontWeight={'700'} fontSize={'14px'}>Action</Text>
              </Td>
            </Tr>
          </Thead>
          <Tbody fontSize={'14px'}>
            {user?.map((user, index) => (
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
                <Td maxW={'250px'} padding={'8px 8px 8px 16px'}>
                  <Text isTruncated>{user.UserAddresses[0]?.specificAddress}</Text>
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Text>{user.UserAddresses[0]?.City?.name}</Text>
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                {user.isVerified === true ? (
                  <Text color={'green'} fontWeight={'700'}>Verified</Text>
                  ) : user.isVerified !== true ? (
                    <Text color={'red'} fontWeight={'700'}>Not Verified</Text>
                  ) : ""}
                </Td>
                <Td padding={'8px 8px 8px 16px'}>
                  <Box display={'flex'} gap={'8px'}>
                    <EditAdmin id={user.id} username={user.username} email={user.email} roleId={user.roleId} onUserUpdated={onUserUpdated}/>
                    <DeleteAdmin id={user.id} onDeletedUser={onUserUpdated}/>
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

export default TableUser

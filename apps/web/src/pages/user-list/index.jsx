import { Box, Flex, Text } from '@chakra-ui/react'
import CreateUser from './components/modal-create'
import { BreadCrumbs } from './components/breadcrumbs'
import { Navbar } from '../../components/navbar'
import { useEffect, useState } from 'react'
import Pagination from './components/pagination'
import Footer from '../../components/Footer/Footer'
import { getUserList } from './services/getUserList'
import TableUser from './components/table-user'
import { SearchUserList } from './components/search-user'
import FilterUser from './components/filterUser'

function UserList() {
  const [user, setUser] = useState([])

  const [cityId, setCityId] = useState('')
  const [isVerified, setIsVerified] = useState('')
  const [username, setUsername] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [sortField, setSortFiled] = useState('username')
  const [sortOrder, setSortOrder] = useState('ASC')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)

  const fetchUserList = async (page = currentPage) => {
    try {
      const fetchUserData = await getUserList(
        cityId,
        isVerified,
        username,
        page,
        pageSize,
        sortField,
        sortOrder,
      )
      setUser(fetchUserData.data)
      setTotalPages(fetchUserData.totalPages)
      setTotalRecords(fetchUserData.totalRecords)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUserList()
  }, [cityId, isVerified, username, currentPage, pageSize, sortField, sortOrder])

  console.log('ini isVerified', user)

  return (
    <Box bg={'#F1F1F1'} height={'100%'}>
      {/* <Navbar /> */}
      <Box padding={{base: '0px 10px', md:'0px 30px'}} marginBottom={'150px'}>
        <Box className="top-dashboard" mt={'36px'} mb={'24px'}>
          <Box display={{ base: 'block', md: 'none' }}>
            <Flex justifyContent={'space-between'} align={'center'} mb={'10px'}>
              <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={'700'}>
                User List
              </Text>
              <CreateUser onAdminUpdated={fetchUserList} />
            </Flex>
            <Flex mb={'20px'}>
              <BreadCrumbs />
            </Flex>
            <Flex justifyContent={'flex-end'} gap={'12px'}>
              <SearchUserList setUsername={setUsername} />
              <FilterUser setCityId={setCityId} setIsVerified={setIsVerified} />
            </Flex>
          </Box>
          
          <Box display={{ base: 'none', md: 'block' }}>
            <Flex justifyContent={'space-between'}>
              <Flex>
                <Text fontSize={'24px'} fontWeight={'700'}>
                  User List
                </Text>
              </Flex>
              <Flex justifyContent={'flex-end'} gap={'12px'}>
                <SearchUserList setUsername={setUsername} />
                <FilterUser setCityId={setCityId} setIsVerified={setIsVerified} />
                <CreateUser onAdminUpdated={fetchUserList} />
              </Flex>
            </Flex>
            <Flex>
              <BreadCrumbs />
            </Flex>
          </Box>
        </Box>
        <Box className="table">
          <TableUser
            user={user}
            onUserUpdated={fetchUserList}
            setSortFiled={setSortFiled}
            setSortOrder={setSortOrder}
          />
        </Box>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          pageSize={pageSize}
          totalRecords={totalRecords}
        />
      </Box>
      {/* <Footer/> */}
    </Box>
  )
}

export default UserList

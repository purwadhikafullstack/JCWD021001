import { Box, Flex, Text } from '@chakra-ui/react'
import { SearchAdmin } from './components/search'
import FilterAdmin from './components/filter'
import CreateUser from './components/modal-create'
import { BreadCrumbs } from './components/breadcrumbs'
import TableAdmin from './components/table-admin'
import { getAdminList } from './services/getAdmin'
import { useEffect, useState } from 'react'
import Pagination from './components/pagination'

function AdminListDashboard() {
  const [admin, setAdmin] = useState([])
  const [warehouseId, setWarehouseId] = useState('')
  const [cityId, setCityId] = useState('')
  const [username, setUsername] = useState('')
  const [sortField, setSortFiled] = useState('roleName')
  const [sortOrder, setSortOrder] = useState('DESC')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)
  const pageSize = 10
  const fetchAdmin = async (page = currentPage) => {
    try {
      const fetchAdminData = await getAdminList(
        warehouseId,
        cityId,
        username,
        page,
        pageSize,
        sortField,
        sortOrder,
      )
      setAdmin(fetchAdminData.data)
      setTotalPages(fetchAdminData.totalPages)
      setTotalRecords(fetchAdminData.totalRecords)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAdmin()
  }, [warehouseId, cityId, username, currentPage, pageSize, sortField, sortOrder])

  return (
    <Box bg={'#F1F1F1'} height={'100%'} w={'100%'} padding={{base: '0px 10px', md:'0px 30px'}}>
        <Box className="top-dashboard" mt={'36px'} mb={'24px'}>
          <Box display={{ base: 'block', md: 'none' }}>
            <Flex justifyContent={'space-between'} align={'center'} mb={'10px'}>
              <Text fontSize={{ base: '16px', md: '24px' }} fontWeight={'700'}>
                Admin List
              </Text>
              <CreateUser onAdminUpdated={fetchAdmin} />
            </Flex>
            <Flex mb={'20px'}>
              <BreadCrumbs />
            </Flex>
            <Flex justifyContent={'flex-end'} gap={'12px'} mb={'10px'}>
              <SearchAdmin setUsername={setUsername} />
              <FilterAdmin setCityId={setCityId} setWarehouseId={setWarehouseId} />
            </Flex>
          </Box>
          <Box display={{ base: 'none', md: 'block' }}>
            <Flex justifyContent={'space-between'}>
              <Flex>
                <Text fontSize={'24px'} fontWeight={'700'}>
                  Admin List
                </Text>
              </Flex>
              <Flex justifyContent={'flex-end'} gap={'12px'}>
                <SearchAdmin setUsername={setUsername} />
                <FilterAdmin setCityId={setCityId} setWarehouseId={setWarehouseId} />
                <CreateUser onAdminUpdated={fetchAdmin} />
              </Flex>
            </Flex>
            <Flex>
              <BreadCrumbs />
            </Flex>
          </Box>
        </Box>
        <Box className="table">
          <TableAdmin
            admin={admin}
            onAdminUpdated={fetchAdmin}
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
  )
}

export default AdminListDashboard

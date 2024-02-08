import { Box, Button, Flex, Heading, Icon, Text } from '@chakra-ui/react'
// import CreateUser from './components/modal-create'
import { BreadCrumbs } from './components/breadcrumbs'
import { Navbar } from '../../components/navbar'
import { useEffect, useState } from 'react'
import Pagination from './components/pagination'
import Footer from '../../components/Footer/Footer'
import { getWarehouseList } from './services/getWarehouseList'
import { SearchWarehouseList } from './components/search-warehouse'
import FilterUser from './components/filterUser'
import TableWarehouse from './components/table-warehouse'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function WarehouseList() {
  const location = useLocation()
  const [warehouse, setWarehouse] = useState([])

  const [provinceId, setProvinceId] = useState('')
  const [name, setName] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [sortField, setSortField] = useState('name')
  const [sortOrder, setSortOrder] = useState('ASC')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalRecords, setTotalRecords] = useState(0)

  const fetchWarehouseList = async (page = currentPage) => {
    try {
      const fetchWarehouseData = await getWarehouseList(
        name,
        provinceId,
        page,
        pageSize,
        sortField,
        sortOrder,
      )
      setWarehouse(fetchWarehouseData.data)
      setTotalPages(fetchWarehouseData.totalPages)
      setTotalRecords(fetchWarehouseData.totalRecords)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchWarehouseList()
  }, [name, provinceId, currentPage, pageSize, sortField, sortOrder])

  useEffect(() => {
    if (location.state?.warehouseCreated) {
      console.log('A warehouse was just created.')
      fetchWarehouseList()
    }
  }, [location.state])

  const navigate = useNavigate()

  return (
    <Box bg={'#F1F1F1'} height={'100%'}>
      <Box padding={{base: '0px 10px', md:'0px 30px'}} marginBottom={'150px'}>
        <Box className="top-dashboard" mt={'36px'} mb={'24px'}>
          <Box display={{ base: 'block', md: 'none' }}>
            <Flex justifyContent={'space-between'} align={'center'} mb={'10px'}>
              <Heading fontSize={{ base: '16px', md: '24px' }} fontWeight={'700'}>
                Warehouse List
              </Heading>
              <Button
                bg={'brand.lightred'}
                color={'white'}
                _hover={{ bg: '#f50f5a' }}
                _active={{ opacity: '70%' }}
                w={{ base: '150px', md: '220px' }}
                h={{ base: '34px', md: '48px' }}
                display={'flex'}
                onClick={() => navigate('/warehouse-list/create-warehouse')}
              >
                <Flex
                  justifyContent={'center'}
                  alignItems={'center'}
                  padding={'12px 16px'}
                  gap={'10px'}
                >
                  <Icon as={PlusIcon} boxSize={{base: '18px', md: '24px'}} />
                  <Text fontSize={{base: '12px', md:'14px'}} fontWeight={'700'}>
                    Create Warehouse
                  </Text>
                </Flex>
              </Button>
            </Flex>
            
              <Flex mb={'20px'}>
                <BreadCrumbs />
              </Flex>

              <Flex justifyContent={'flex-end'} gap={'12px'}>
                <SearchWarehouseList setName={setName} />
                <FilterUser setProvinceId={setProvinceId} />
              </Flex>
            
          </Box>

          <Box display={{ base: 'none', md: 'block' }}>
            <Flex justifyContent={'space-between'}>
              <Flex>
                <Text fontSize={'24px'} fontWeight={'700'}>
                  Warehouse List
                </Text>
              </Flex>
              <Flex justifyContent={'flex-end'} gap={'12px'}>
                <SearchWarehouseList setName={setName} />
                <FilterUser setProvinceId={setProvinceId} />
                <Button
                  bg={'brand.lightred'}
                  color={'white'}
                  _hover={{ bg: '#f50f5a' }}
                  _active={{ opacity: '70%' }}
                  minW={'185px'}
                  h={'48px'}
                  display={'flex'}
                  onClick={() => navigate('/warehouse-list/create-warehouse')}
                >
                  <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    padding={'12px 16px'}
                    gap={'10px'}
                  >
                    <Icon as={PlusIcon} boxSize={'24px'} />
                    <Text fontSize={'14px'} fontWeight={'700'}>
                      Create Warehouse
                    </Text>
                  </Flex>
                </Button>
              </Flex>
            </Flex>
            <Flex>
              <BreadCrumbs />
            </Flex>
          </Box>
        </Box>
        <Box className="table">
          <TableWarehouse
            warehouse={warehouse}
            onWarehouseUpdated={fetchWarehouseList}
            setSortField={setSortField}
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
    </Box>
  )
}

export default WarehouseList

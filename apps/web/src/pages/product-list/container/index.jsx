import { Box, Flex, Icon } from '@chakra-ui/react'
import { Body } from '../components/body'
import { useLocation, useParams } from 'react-router-dom'
import { getProduct } from '../services/readProduct'
import { useEffect, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { SideBar } from '../../../components/sidebar'
import { Navbar } from '../../../components/Navbar'
import { getProductCategories } from '../services/readProductCategory'

export const Product = () => {
  // useLocation to know url route
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const sortValue = queryParams.get('so')
  const { pathname } = location
  const { gender, group, category } = useParams()
  const breadCrumbs = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: gender,
      url: `/p/${gender}`,
    },
    {
      label: group,
      url: `/p/${gender}/${group}`,
    },
    {
      label: category,
      url: `/p/${gender}/${group}/${category}`,
    },
  ]

  // Splitting pathname for breadcrumbs
  const segments = pathname.split('/')

  // Empty array state for products
  const [products, setProducts] = useState([])

  // State for filtering products
  const [productName, setProductName] = useState('')
  const [productGender, setProductGender] = useState('')
  const [productGroup, setProductGroup] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [orderBy, setOrderBy] = useState('ASC')
  const [pageSize, setPageSize] = useState(10)
  // Get product data
  useEffect(() => {
    getProduct(productName, gender, group, category, setProducts, sortBy, orderBy, 1, pageSize)
  }, [
    sortValue,
    productName,
    productGender,
    productGroup,
    productCategory,
    orderBy,
    sortBy,
    gender,
    group,
    category,
    setProductGender,
    setSortBy,
    setOrderBy,
    setProductGroup,
    setProductCategory,
    pageSize,
    setPageSize,
  ])

  // This is for sidebar product categories, and type
  const [productCategories, setProductCategories] = useState([])
  // Get Product Category Data
  useEffect(() => {
    getProductCategories(setProductCategories, gender)
  }, [])
  // Collapse Sidebar
  const [collapseSideBar, setCollapseSideBar] = useState(false)
  const toggleSideBar = () => {
    setCollapseSideBar(!collapseSideBar)
  }

  return (
    <Box minH={'100vh'} w={'100%'} overflowX={'scroll'}>
      <Navbar
        collapseSideBar={collapseSideBar}
        setCollapseSideBar={setCollapseSideBar}
        toggleSideBar={toggleSideBar}
      />
      <Box display={{ base: collapseSideBar ? 'block' : 'none', md: 'none' }} maxW={'100%'}>
        <SideBar
          gender={gender}
          group={group}
          category={category}
          setProductGroup={setProductGroup}
          setProductCategory={setProductCategory}
          productCategories={productCategories}
          pathname={pathname}
          collapseSideBar={collapseSideBar}
          setCollapseSideBar={setCollapseSideBar}
          toggleSideBar={toggleSideBar}
          segments={segments}
          setPageSize={setPageSize}
        />
      </Box>
      <Box display={collapseSideBar ? 'none' : 'block'}>
        <Body
          breadCrumbs={breadCrumbs}
          gender={gender}
          group={group}
          category={category}
          pathname={pathname}
          segments={segments}
          products={products}
          productCategories={productCategories}
          setProductName={setProductName}
          setProductGender={setProductGender}
          setProductGroup={setProductGroup}
          setProductCategory={setProductCategory}
          setOrderBy={setOrderBy}
          setSortBy={setSortBy}
          orderBy={orderBy}
          sortBy={sortBy}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </Box>
      <Flex
        zIndex={'3'}
        bgColor={'white'}
        position={'fixed'}
        top={'50%'}
        transform={'translateY(50%)'}
        w={'1.8em'}
        h={'1.8em'}
        alignItems={'center'}
        justifyContent={'center'}
        borderRadius={'50%'}
        left={'-.5em'}
        visibility={{
          base: collapseSideBar ? 'hidden' : 'visible',
          md: 'hidden',
        }}
        cursor={'pointer'}
      >
        <Icon as={ChevronRightIcon} onClick={() => toggleSideBar()} />
      </Flex>
    </Box>
  )
}

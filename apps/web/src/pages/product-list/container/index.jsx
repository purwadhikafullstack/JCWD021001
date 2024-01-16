import { Box, Flex, Icon } from '@chakra-ui/react'
import { Body } from '../components/body'
import { useLocation, useParams } from 'react-router-dom'
import { getProduct } from '../services/readProduct'
import { useEffect, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Navbar } from '../../../components/navbar'
import { SideBar } from '../../../components/sidebar'
import { getProductCategory } from '../services/readProductCategory'
import capitalize from 'capitalize'

export const Product = () => {
  // useLocation to know url route
  const location = useLocation()
  const { pathname } = location

  const { gender, group, category } = useParams()
  // Splitting pathname for breadcrumbs
  const segments = pathname.split('/')

  // Empty array state for products
  const [products, setProducts] = useState([])

  // State for filtering products
  const [productName, setProductName] = useState('')
  const [productGroup, setProductGroup] = useState(capitalize(gender))
  const [productCategory, setProductCategory] = useState(
    capitalize.words(group).replace(/and/gi, '&').replace(/-/g, ' '),
  )
  const [productType, setProductType] = useState(null)
  // This is for sidebar product categories, and type
  const [productCategories, setProductCategories] = useState([])
  // Sidebar
  const [collapseSideBar, setCollapseSideBar] = useState(false)

  const [sortBy, setSortBy] = useState('name')
  const [orderBy, setOrderBy] = useState('ASC')
  // Get product data
  useEffect(() => {
    getProduct(
      productName,
      gender,
      group,
      capitalize.words(category).replace(/and/gi, '&').replace(/-/g, ' '),
      setProducts,
      sortBy,
      orderBy,
    )
  }, [
    productName,
    productGroup,
    productCategory,
    productType,
    orderBy,
    sortBy,
    setProductGroup,
    setSortBy,
    setOrderBy,
    setProductCategory,
    setProductType,
  ])

  // Get Product Category Data
  useEffect(() => {
    getProductCategory(setProductCategories)
  }, [])

  const toggleSideBar = () => {
    setCollapseSideBar(!collapseSideBar)
  }

  return (
    <Box minH={'100vh'}>
      <Navbar
        collapseSideBar={collapseSideBar}
        setCollapseSideBar={setCollapseSideBar}
        toggleSideBar={toggleSideBar}
      />
      <Box display={{ base: collapseSideBar ? 'block' : 'none', md: 'none' }}>
        <SideBar
          gender={gender}
          category={category}
          pathname={pathname}
          collapseSideBar={collapseSideBar}
          setCollapseSideBar={setCollapseSideBar}
          toggleSideBar={toggleSideBar}
          productCategories={productCategories}
          segments={segments}
          setProductCategory={setProductCategory}
          setProductType={setProductType}
        />
      </Box>
      <Box display={collapseSideBar ? 'none' : 'block'}>
        <Body
          gender={gender}
          category={category}
          pathname={pathname}
          productCategories={productCategories}
          segments={segments}
          products={products}
          setProductName={setProductName}
          setProductGroup={setProductGroup}
          setProductCategory={setProductCategory}
          setProductType={setProductType}
          setOrderBy={setOrderBy}
          setSortBy={setSortBy}
          orderBy={orderBy}
          sortBy={sortBy}
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

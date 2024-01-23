import { Box, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../../../components/navbar'
import { Body } from '../component/body'
import { getProduct } from '../../product-list/services/readProduct'
import { useEffect, useState } from 'react'
export const ProductSearch = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const queryValue = queryParams.get('q')
  const [products, setProducts] = useState([])
  const [sortBy, setSortBy] = useState('name')
  const [orderBy, setOrderBy] = useState('ASC')
  useEffect(() => {
    getProduct(queryValue, '', '', '', setProducts, sortBy, orderBy)
  }, [queryValue])
  return (
    <Box minH={'100vh'}>
      <Navbar />
      <Body
        products={products}
        queryValue={queryValue}
        setOrderBy={setOrderBy}
        setSortBy={setSortBy}
        orderBy={orderBy}
        sortBy={sortBy}
      />
    </Box>
  )
}

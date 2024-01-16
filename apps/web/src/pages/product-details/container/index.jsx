import { Box, Text, useEditable } from '@chakra-ui/react'
import { Navbar } from '../../../components/navbar'
import { Body } from '../components/body'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductDetails } from '../services/readProductDetails'
export const ProductDetails = () => {
  const { id } = useParams()
  console.log('Product Id', id)
  const [product, setProduct] = useState(null)
  useEffect(() => {
    getProductDetails(id, setProduct)
  }, [])
  console.log('Product', product)
  return (
    <Box>
      <Navbar />
      <Body product={product} />
    </Box>
  )
}

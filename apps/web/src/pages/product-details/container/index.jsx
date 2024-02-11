import { Box } from '@chakra-ui/react'
import { Navbar } from '../../../components/Navbar'
import { Body } from '../components/body'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProductDetails } from '../services/readProductDetails'

export const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  useEffect(() => {
    getProductDetails(id).then((data) => setProduct(data))
  }, [])
  return (
    <Box>
      <Navbar />
      <Body product={product} />
    </Box>
  )
}

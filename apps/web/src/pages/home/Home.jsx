import { useEffect, useState } from 'react'
import CategoryList from './components/category-list'
import { Navbar } from '../../components/Navbar'
import Footer from '../../components/Footer/Footer'
import { Box, Flex, Text, Link } from '@chakra-ui/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { getProducts, getProductsDua } from './services/readProducts'
import { ProductCard } from './components/productCard'
import NewArrival from './components/new-arrival'
import SwiperBox from './components/swiper'


function Home() {
  const [products, setProducts] = useState([])
  const [productsDua, setProductsDua] = useState([])

  const fetchData = async (page, pageSize, orderBy, sortBy) => {
    try {
      const fetchProducts = await getProducts(page, pageSize, orderBy, sortBy)
      setProducts(fetchProducts)
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const fetchDataDua = async (page, pageSize, orderBy, sortBy) => {
    try {
      const fetchProducts = await getProductsDua(page, pageSize, orderBy, sortBy)
      setProductsDua(fetchProducts)
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    fetchDataDua()
  }, [])

  const renderedProducts = products?.rows?.map((product, index) => {
    return <ProductCard {...product} key={index} />
  })
  const renderedProductsDua = productsDua?.rows?.map((product, index) => {
    return <ProductCard {...product} key={index} />
  })

  return (
    <Box width={'100vw'} overflow={'hidden'}>
      <Navbar position="relative" />
      <Box className="container-homepage" bg={'brand.grey100'}>
        <Box className="Header" height={'712px'} position={'relative'}>
          <SwiperBox/>
        </Box>
        <Box padding={'20px'} >
          <CategoryList />
          <Box className="Best-Deal" margin={'60px auto'} position={'relative'} width={'95%'}>
            <Flex justifyContent={'space-between'}>
            <Text fontWeight={'700'} fontSize={'24px'}>
              Best Deals
            </Text>
            <Link color={'brand.lightred'} fontSize={'18px'} fontWeight={'700'} _hover={{color: '#fd1c65'}} href='/search'>
              See more
            </Link>
            </Flex>
            
            <Flex
              className="best-list"
              gap={'24px'}
              overflowX={{ base: '', md: 'auto' }}
              marginTop={'14px'}
              justifyContent={{ base: 'center', md: 'flex-start' }}
              wrap={{ base: 'wrap', md: 'nowrap' }}
              borderRadius={'12px'}
            >
              {renderedProducts}
            </Flex>
            
          </Box>
          <Box className="category-second" margin={'24px auto'} position={'relative'} width={'95%'}>
            <Text textAlign={'center'} fontSize={'32px'} fontWeight={'700'} mb={'60px'}>New Arrival</Text>
            <NewArrival/>
          </Box>
          <Box className="Best-Deal" margin={'60px auto 100px'} position={'relative'} width={'95%'}>
            <Flex justifyContent={'space-between'}>
            <Text fontWeight={'700'} fontSize={'24px'}>
              You May Like
            </Text>
            <Link color={'brand.lightred'} fontSize={'18px'} fontWeight={'700'} _hover={{color: '#fd1c65'}} href='/search'>
              See more
            </Link>
            </Flex>
            
            <Flex
              className="best-list"
              gap={'24px'}
              overflowX={{ base: '', md: 'auto' }}
              marginTop={'14px'}
              justifyContent={{ base: 'center', md: 'flex-start' }}
              wrap={{ base: 'wrap', md: 'nowrap' }}
              borderRadius={'12px'}
            >
              {renderedProductsDua}
            </Flex>
            
          </Box>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}

export default Home

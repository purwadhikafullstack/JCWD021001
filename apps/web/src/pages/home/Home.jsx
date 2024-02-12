import { useEffect, useState } from 'react'
import axios from 'axios'
import { PlusIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import CategoryList from './components/category-list'
// import './Home.css';
import { Navbar } from '../../components/Navbar'
import Footer from '../../components/Footer/Footer'
import { Box, Flex, Text, Image, Link, Button, Icon, Grid } from '@chakra-ui/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useNavigate } from 'react-router-dom'
import { getProducts } from './services/readProducts'
import { ProductCard } from './components/productCard'
import NewArrival from './components/new-arrival'
import SwiperBox from './components/swiper'

// import './Home.css';

function Home() {
  const [products, setProducts] = useState([])
  const bestDeals = async () => {
    try {
      await axios.get('http:localhost:8000/product')
    } catch (err) {
      console.log(err)
    }
  }
  const navigate = useNavigate()

  const fetchData = async (page, pageSize) => {
    try {
      const fetchProducts = await getProducts(page, pageSize)
      setProducts(fetchProducts)
    } catch (err) {
      console.log(err.message)
    }
  }
  console.log(products)
  useEffect(() => {
    fetchData()
  }, [])

  const renderedProducts = products?.rows?.map((product, index) => {
    return <ProductCard {...product} key={index} />
  })

  console.log('rendered product', renderedProducts)

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
              {renderedProducts}
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

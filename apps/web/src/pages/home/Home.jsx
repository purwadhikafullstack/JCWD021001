import { useEffect, useState } from 'react'
import axios from 'axios'
import { PlusIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import CategoryList from './components/category-list'
// import './Home.css';
import { Navbar } from '../../components/navbar'
import Footer from '../../components/Footer/Footer'
import { Box, Flex, Text, Image, Link, Button, Icon, Grid } from '@chakra-ui/react'
import swiper1 from '../../assets/images/homepage-images/swiper-1.jpeg'
import swiper2 from '../../assets/images/homepage-images/swiper-2.jpeg'
import swiper3 from '../../assets/images/homepage-images/swiper-3.jpeg'
import swiper4 from '../../assets/images/homepage-images/swiper-4.jpeg'
import swiper5 from '../../assets/images/homepage-images/swiper-5.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useNavigate } from 'react-router-dom'
import { getProducts } from './services/readProducts'
import { ProductCard } from './components/productCard'

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
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Image src={swiper1} objectFit={'cover'} height={'712px'} width={'100%'} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={swiper2} objectFit={'cover'} height={'712px'} width={'100%'} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={swiper3} objectFit={'cover'} height={'712px'} width={'100%'} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={swiper4} objectFit={'cover'} height={'712px'} width={'100%'} />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={swiper5} objectFit={'cover'} height={'712px'} width={'100%'} />
            </SwiperSlide>
          </Swiper>
          {/* <Text position={'absolute'}>SALE 2023</Text> */}
        </Box>
        <Box padding={'20px'}>
          <CategoryList />
          <Box className="Best-Deal" margin={'24px auto 24px'} position={'relative'} width={'95%'}>
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
            >
              {renderedProducts}
            </Flex>

            <Box className="category-second" margin={'24px auto'} position={'relative'} width={'95%'}>

            </Box>
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

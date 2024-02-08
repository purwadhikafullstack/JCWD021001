import { useEffect, useState } from 'react'
import axios from 'axios'
import { PlusIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import CategoryList from './components/category-list'
// import './Home.css';
import { Navbar } from '../../components/navbar'
import Footer from '../../components/Footer/Footer'
import { Box, Flex, Text, Image, Stack, Button, Icon, Grid } from '@chakra-ui/react'
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
import product1 from '../../assets/images/homepage-images/product-1.png'
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

  console.log('rendered product', renderedProducts);

  return (
    <Box width={'100vw'} overflow={'hidden'}>
      <Navbar  position="relative" />
      <Box className="container-homepage"  bg={'brand.grey100'} >
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
            zIndex={0}
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
       <CategoryList/>
        <Box className="Best-Deal" margin={'24px auto 24px'} position={'relative'} width={'95%'}>
          <Text fontWeight={'700'} fontSize={'24px'}>
            Best Deals
          </Text>
          
          <Flex
            className="best-list"
            gap={'24px'}
            flexWrap={'wrap'}
            marginTop={'14px'}
            justifyContent={'center'}
          >
            <Box w={'100%'}>
                <Grid
                  gridTemplateColumns={{
                    base: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(5, 1fr)',
                    xl: 'repeat(7, 1fr)',
                  }}
                  // gridGap={{ base: '2em' }}
                  gridColumnGap={'1.5em'}
                  gridRowGap={'1.5em'}
                  justifyItems={'center'}
                >
                  {renderedProducts}
                </Grid>
              </Box>
          </Flex>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  )
}

export default Home

import axios from 'axios'
import { PlusIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
// import './Home.css';
import Footer from '../../components/Footer/Footer'
import { Box, Flex, Text, Image, Stack, Button, Icon } from '@chakra-ui/react'
import women from '../../assets/images/homepage-images/category-women.jpeg'
import men from '../../assets/images/homepage-images/category-men.jpeg'
import kids from '../../assets/images/homepage-images/category-kids.jpeg'
import baby from '../../assets/images/homepage-images/category-baby.jpeg'
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
import { Navbar } from '../../components/navbar'
import { useNavigate } from 'react-router-dom'
// import './Home.css';

function Home() {
  const bestDeals = async () => {
    try {
      await axios.get('http:localhost:8000/product')
    } catch (err) {
      console.log(err)
    }
  }
  const navigate = useNavigate()
  return (
    <>
      <Box container-homepage width={'100vw'} bg={'brand.grey100'}>
        <Navbar />
        <Box className="Header" height={'712px'}>
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
        <Box className="category" margin={'24px auto'} position={'relative'} width={'95%'}>
          <Text fontWeight={'700'} fontSize={'24px'}>
            Category
          </Text>
          <Flex
            className="category-list"
            gap={'24px'}
            flexWrap={'wrap'}
            marginTop={'14px'}
            justifyContent={'center'}
          >
            <Box
              className={'category-women'}
              width={'330px'}
              height={'330px'}
              bg={'white'}
              position={'relative'}
              onClick={() => {
                navigate('/women/tops')
              }}
            >
              <Box
                position={'absolute'}
                zIndex={'99'}
                left={'0'}
                right={'0'}
                margin={'0 auto'}
                width={'300px'}
                bottom={'25px'}
                pointerEvents={'none'}
              >
                <Text
                  fontFamily={'Darker Grotesque'}
                  fontWeight={'700'}
                  fontSize={'48px'}
                  color={'white'}
                  textAlign={'center'}
                >
                  W O M E N
                </Text>
              </Box>
              <Image
                src={women}
                objectFit={'cover'}
                borderRadius={'12px'}
                height={'100%'}
                width={'100%'}
                opacity={'0.75'}
                _hover={{ opacity: '1' }}
              />
            </Box>
            <Box
              className={'category-men'}
              width={'330px'}
              height={'330px'}
              bg={'white'}
              position={'relative'}
              onClick={() => {
                navigate('/men')
              }}
            >
              <Box
                position={'absolute'}
                zIndex={'99'}
                left={'0'}
                right={'0'}
                margin={'0 auto'}
                width={'300px'}
                bottom={'25px'}
                pointerEvents={'none'}
              >
                <Text
                  fontFamily={'Darker Grotesque'}
                  fontWeight={'700'}
                  fontSize={'48px'}
                  color={'white'}
                  textAlign={'center'}
                >
                  M E N
                </Text>
              </Box>
              <Image
                src={men}
                objectFit={'cover'}
                borderRadius={'12px'}
                height={'100%'}
                width={'100%'}
                opacity={'0.75'}
                _hover={{ opacity: '1' }}
              />
            </Box>
            <Box
              className={'category-kids'}
              width={'330px'}
              height={'330px'}
              bg={'white'}
              position={'relative'}
              onClick={() => {
                navigate('/kids')
              }}
            >
              <Box
                position={'absolute'}
                zIndex={'99'}
                left={'0'}
                right={'0'}
                margin={'0 auto'}
                width={'300px'}
                bottom={'25px'}
                pointerEvents={'none'}
              >
                <Text
                  fontFamily={'Darker Grotesque'}
                  fontWeight={'700'}
                  fontSize={'48px'}
                  color={'white'}
                  textAlign={'center'}
                >
                  K I D S
                </Text>
              </Box>
              <Image
                src={kids}
                objectFit={'cover'}
                borderRadius={'12px'}
                height={'100%'}
                width={'100%'}
                opacity={'0.75'}
                _hover={{ opacity: '1' }}
              />
            </Box>
            <Box
              className={'category-baby'}
              width={'330px'}
              height={'330px'}
              bg={'white'}
              position={'relative'}
              onClick={() => {
                navigate('/kids')
              }}
            >
              <Box
                position={'absolute'}
                zIndex={'99'}
                left={'0'}
                right={'0'}
                margin={'0 auto'}
                width={'300px'}
                bottom={'25px'}
                pointerEvents={'none'}
              >
                <Text
                  fontFamily={'Darker Grotesque'}
                  fontWeight={'700'}
                  fontSize={'48px'}
                  color={'white'}
                  textAlign={'center'}
                >
                  K I D S
                </Text>
              </Box>
              <Image
                src={baby}
                objectFit={'cover'}
                borderRadius={'12px'}
                height={'100%'}
                width={'100%'}
                opacity={'0.75'}
                _hover={{ opacity: '1' }}
              />
            </Box>
          </Flex>
        </Box>
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
            <Box className="card-product" maxH={'372px'} maxW={'212px'} bg={'white'}>
              <Stack>
                <Box width={'100%'} maxH={'212px'}>
                  <Image src={product1} width={'100%'} height={'100%'} />
                </Box>
                <Box>
                  <Flex
                    height={'44px'}
                    maxW={'212px'}
                    justifyContent={'center'}
                    padding={'10px'}
                    overflow={'hidden'}
                  >
                    <Text fontWeight={'600'} fontSize={'14px'} overflow={'hidden'} wrap={'nowrap'}>
                      Comfortable Clothes by Pure Fashionwear
                    </Text>
                  </Flex>
                  <Flex
                    height={'24px'}
                    maxW={'212px'}
                    padding={'4px 10px'}
                    overflow={'hidden'}
                    gap={'10px'}
                  >
                    <Text fontWeight={'700'} fontSize={'12px'}>
                      Rp. 1000.000
                    </Text>
                    <Text
                      fontWeight={'700'}
                      fontSize={'12px'}
                      color={'brand.pastelred'}
                      textDecor={'line-through'}
                    >
                      Rp. 1000.000
                    </Text>
                  </Flex>
                  <Flex
                    height={'24px'}
                    maxW={'212px'}
                    padding={'2px 10px 8px'}
                    overflow={'hidden'}
                    gap={'2px'}
                    alignItems={'center'}
                  >
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Text>(200)</Text>
                  </Flex>
                  <Flex
                    height={'50px'}
                    maxW={'212px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    padding={'8px 10px'}
                    overflow={'hidden'}
                    gap={'10px'}
                  >
                    <Button
                      width={'100%'}
                      height={'100%'}
                      border={'1px solid #CD0244'}
                      bg={'white'}
                      color={'brand.lightred'}
                      gap={'10px'}
                      _hover={{ color: 'brand.redhover', borderColor: 'brand.redhover' }}
                    >
                      <Icon as={PlusIcon} />
                      Add to Cart
                    </Button>
                  </Flex>
                </Box>
              </Stack>
            </Box>
            <Box className="card-product" maxH={'372px'} maxW={'212px'} bg={'white'}>
              <Stack>
                <Box width={'100%'} maxH={'212px'}>
                  <Image src={product1} width={'100%'} height={'100%'} />
                </Box>
                <Box>
                  <Flex
                    height={'44px'}
                    maxW={'212px'}
                    justifyContent={'center'}
                    padding={'10px'}
                    overflow={'hidden'}
                  >
                    <Text fontWeight={'600'} fontSize={'14px'} overflow={'hidden'} wrap={'nowrap'}>
                      Comfortable Clothes by Pure Fashionwear
                    </Text>
                  </Flex>
                  <Flex
                    height={'24px'}
                    maxW={'212px'}
                    padding={'4px 10px'}
                    overflow={'hidden'}
                    gap={'10px'}
                  >
                    <Text fontWeight={'700'} fontSize={'12px'}>
                      Rp. 1000.000
                    </Text>
                    <Text
                      fontWeight={'700'}
                      fontSize={'12px'}
                      color={'brand.pastelred'}
                      textDecor={'line-through'}
                    >
                      Rp. 1000.000
                    </Text>
                  </Flex>
                  <Flex
                    height={'24px'}
                    maxW={'212px'}
                    padding={'2px 10px 8px'}
                    overflow={'hidden'}
                    gap={'2px'}
                    alignItems={'center'}
                  >
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Text>(200)</Text>
                  </Flex>
                  <Flex
                    height={'50px'}
                    maxW={'212px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    padding={'8px 10px'}
                    overflow={'hidden'}
                    gap={'10px'}
                  >
                    <Button
                      width={'100%'}
                      height={'100%'}
                      border={'1px solid #CD0244'}
                      bg={'white'}
                      color={'brand.lightred'}
                      gap={'10px'}
                      _hover={{ color: 'brand.redhover', borderColor: 'brand.redhover' }}
                    >
                      <Icon as={PlusIcon} />
                      Add to Cart
                    </Button>
                  </Flex>
                </Box>
              </Stack>
            </Box>
            <Box className="card-product" maxH={'372px'} maxW={'212px'} bg={'white'}>
              <Stack>
                <Box width={'100%'} maxH={'212px'}>
                  <Image src={product1} width={'100%'} height={'100%'} />
                </Box>
                <Box>
                  <Flex
                    height={'44px'}
                    maxW={'212px'}
                    justifyContent={'center'}
                    padding={'10px'}
                    overflow={'hidden'}
                  >
                    <Text fontWeight={'600'} fontSize={'14px'} overflow={'hidden'} wrap={'nowrap'}>
                      Comfortable Clothes by Pure Fashionwear
                    </Text>
                  </Flex>
                  <Flex
                    height={'24px'}
                    maxW={'212px'}
                    padding={'4px 10px'}
                    overflow={'hidden'}
                    gap={'10px'}
                  >
                    <Text fontWeight={'700'} fontSize={'12px'}>
                      Rp. 1000.000
                    </Text>
                    <Text
                      fontWeight={'700'}
                      fontSize={'12px'}
                      color={'brand.pastelred'}
                      textDecor={'line-through'}
                    >
                      Rp. 1000.000
                    </Text>
                  </Flex>
                  <Flex
                    height={'24px'}
                    maxW={'212px'}
                    padding={'2px 10px 8px'}
                    overflow={'hidden'}
                    gap={'2px'}
                    alignItems={'center'}
                  >
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Text>(200)</Text>
                  </Flex>
                  <Flex
                    height={'50px'}
                    maxW={'212px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    padding={'8px 10px'}
                    overflow={'hidden'}
                    gap={'10px'}
                  >
                    <Button
                      width={'100%'}
                      height={'100%'}
                      border={'1px solid #CD0244'}
                      bg={'white'}
                      color={'brand.lightred'}
                      gap={'10px'}
                      _hover={{ color: 'brand.redhover', borderColor: 'brand.redhover' }}
                    >
                      <Icon as={PlusIcon} />
                      Add to Cart
                    </Button>
                  </Flex>
                </Box>
              </Stack>
            </Box>
            <Box className="card-product" maxH={'372px'} maxW={'212px'} bg={'white'}>
              <Stack>
                <Box width={'100%'} maxH={'212px'}>
                  <Image src={product1} width={'100%'} height={'100%'} />
                </Box>
                <Box>
                  <Flex
                    height={'44px'}
                    maxW={'212px'}
                    justifyContent={'center'}
                    padding={'10px'}
                    overflow={'hidden'}
                  >
                    <Text fontWeight={'600'} fontSize={'14px'} overflow={'hidden'} wrap={'nowrap'}>
                      Comfortable Clothes by Pure Fashionwear
                    </Text>
                  </Flex>
                  <Flex
                    height={'24px'}
                    maxW={'212px'}
                    padding={'4px 10px'}
                    overflow={'hidden'}
                    gap={'10px'}
                  >
                    <Text fontWeight={'700'} fontSize={'12px'}>
                      Rp. 1000.000
                    </Text>
                    <Text
                      fontWeight={'700'}
                      fontSize={'12px'}
                      color={'brand.pastelred'}
                      textDecor={'line-through'}
                    >
                      Rp. 1000.000
                    </Text>
                  </Flex>
                  <Flex
                    height={'24px'}
                    maxW={'212px'}
                    padding={'2px 10px 8px'}
                    overflow={'hidden'}
                    gap={'2px'}
                    alignItems={'center'}
                  >
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Text>(200)</Text>
                  </Flex>
                  <Flex
                    height={'50px'}
                    maxW={'212px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    padding={'8px 10px'}
                    overflow={'hidden'}
                    gap={'10px'}
                  >
                    <Button
                      width={'100%'}
                      height={'100%'}
                      border={'1px solid #CD0244'}
                      bg={'white'}
                      color={'brand.lightred'}
                      gap={'10px'}
                      _hover={{ color: 'brand.redhover', borderColor: 'brand.redhover' }}
                    >
                      <Icon as={PlusIcon} />
                      Add to Cart
                    </Button>
                  </Flex>
                </Box>
              </Stack>
            </Box>
            <Box className="card-product" maxH={'372px'} maxW={'212px'} bg={'white'}>
              <Stack>
                <Box width={'100%'} maxH={'212px'}>
                  <Image src={product1} width={'100%'} height={'100%'} />
                </Box>
                <Box>
                  <Flex
                    height={'44px'}
                    maxW={'212px'}
                    justifyContent={'center'}
                    padding={'10px'}
                    overflow={'hidden'}
                  >
                    <Text fontWeight={'600'} fontSize={'14px'} overflow={'hidden'} wrap={'nowrap'}>
                      Comfortable Clothes by Pure Fashionwear
                    </Text>
                  </Flex>
                  <Flex
                    height={'24px'}
                    maxW={'212px'}
                    padding={'4px 10px'}
                    overflow={'hidden'}
                    gap={'10px'}
                  >
                    <Text fontWeight={'700'} fontSize={'12px'}>
                      Rp. 1000.000
                    </Text>
                    <Text
                      fontWeight={'700'}
                      fontSize={'12px'}
                      color={'brand.pastelred'}
                      textDecor={'line-through'}
                    >
                      Rp. 1000.000
                    </Text>
                  </Flex>
                  <Flex
                    height={'24px'}
                    maxW={'212px'}
                    padding={'2px 10px 8px'}
                    overflow={'hidden'}
                    gap={'2px'}
                    alignItems={'center'}
                  >
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Text>(200)</Text>
                  </Flex>
                  <Flex
                    height={'50px'}
                    maxW={'212px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    padding={'8px 10px'}
                    overflow={'hidden'}
                    gap={'10px'}
                  >
                    <Button
                      width={'100%'}
                      height={'100%'}
                      border={'1px solid #CD0244'}
                      bg={'white'}
                      color={'brand.lightred'}
                      gap={'10px'}
                      _hover={{ color: 'brand.redhover', borderColor: 'brand.redhover' }}
                    >
                      <Icon as={PlusIcon} />
                      Add to Cart
                    </Button>
                  </Flex>
                </Box>
              </Stack>
            </Box>
            <Box className="card-product" maxH={'372px'} maxW={'212px'} bg={'white'}>
              <Stack>
                <Box width={'100%'} maxH={'212px'}>
                  <Image src={product1} width={'100%'} height={'100%'} />
                </Box>
                <Box>
                  <Flex
                    height={'44px'}
                    maxW={'212px'}
                    justifyContent={'center'}
                    padding={'10px'}
                    overflow={'hidden'}
                  >
                    <Text fontWeight={'600'} fontSize={'14px'} overflow={'hidden'} wrap={'nowrap'}>
                      Comfortable Clothes by Pure Fashionwear
                    </Text>
                  </Flex>
                  <Flex
                    height={'24px'}
                    maxW={'212px'}
                    padding={'4px 10px'}
                    overflow={'hidden'}
                    gap={'10px'}
                  >
                    <Text fontWeight={'700'} fontSize={'12px'}>
                      Rp. 1000.000
                    </Text>
                    <Text
                      fontWeight={'700'}
                      fontSize={'12px'}
                      color={'brand.pastelred'}
                      textDecor={'line-through'}
                    >
                      Rp. 1000.000
                    </Text>
                  </Flex>
                  <Flex
                    height={'24px'}
                    maxW={'212px'}
                    padding={'2px 10px 8px'}
                    overflow={'hidden'}
                    gap={'2px'}
                    alignItems={'center'}
                  >
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Icon as={StarIcon} color={'brand.yellow'} />
                    <Text>(200)</Text>
                  </Flex>
                  <Flex
                    height={'50px'}
                    maxW={'212px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    padding={'8px 10px'}
                    overflow={'hidden'}
                    gap={'10px'}
                  >
                    <Button
                      width={'100%'}
                      height={'100%'}
                      border={'1px solid #CD0244'}
                      bg={'white'}
                      color={'brand.lightred'}
                      gap={'10px'}
                      _hover={{ color: 'brand.redhover', borderColor: 'brand.redhover' }}
                    >
                      <Icon as={PlusIcon} />
                      Add to Cart
                    </Button>
                  </Flex>
                </Box>
              </Stack>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  )
}

export default Home

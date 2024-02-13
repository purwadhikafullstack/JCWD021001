
import { Box, Text, Image} from '@chakra-ui/react'
import swiper1 from '../../../../assets/images/homepage-images/swiper-1.jpeg'
import swiper2 from '../../../../assets/images/homepage-images/swiper-2.jpeg'
import swiper3 from '../../../../assets/images/homepage-images/swiper-3.jpeg'
import swiper4 from '../../../../assets/images/homepage-images/swiper-4.jpeg'
import swiper5 from '../../../../assets/images/homepage-images/swiper-5.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

function SwiperBox (){
    return (
        <>
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            // zIndex={0}
          >
            <SwiperSlide display={'relative'}>
            <Box
              position={'absolute'}
              zIndex={'99'}
              left={'0'}
              right={'0'}
              margin={'0 auto'}
              width={{base: '200px', md:'500px'}}
              bottom={{base: '250px', md: '200px'}}
              pointerEvents={'none'}
              border={'5px solid white'}
            >
              <Text
                fontFamily={'Darker Grotesque'}
                fontWeight={'700'}
                fontSize={{ base: '60px', md: '82px', lg: '100px' }}
                color={'white'}
                textAlign={'center'}
              >
                S A L E
              </Text>
              <Text
                fontFamily={'Darker Grotesque'}
                fontWeight={'700'}
                fontSize={{ base: '60px', md: '82px', lg: '100px' }}
                color={'white'}
                textAlign={'center'}
              >
                2 0 2 4
              </Text>
            </Box>
              <Image src={swiper1} objectFit={'cover'} height={'712px'} width={'100%'} />
            </SwiperSlide>
            <SwiperSlide display={'relative'}>
            <Box
              position={'absolute'}
              zIndex={'99'}
              left={'0'}
              right={'0'}
              margin={'0 auto'}
              bottom={'250px'}
              pointerEvents={'none'}
            >
              <Text
                fontFamily={'Darker Grotesque'}
                fontWeight={'700'}
                fontSize={{ base: '60px', md: '82px', lg: '100px' }}
                color={'white'}
                textAlign={'center'}
              >
                SPECIAL EDITION
              </Text>
            </Box>
              <Image src={swiper2} objectFit={'cover'} height={'712px'} width={'100%'} />
            </SwiperSlide>
            <SwiperSlide display={'relative'}>
            <Box
              position={'absolute'}
              zIndex={'99'}
              left={'0'}
              right={'0'}
              margin={'0 auto'}
              bottom={'250px'}
              pointerEvents={'none'}
            >
              <Text
                fontFamily={'Darker Grotesque'}
                fontWeight={'600'}
                fontSize={{ base: '55px', md: '72px', lg: '100px' }}
                color={'white'}
                textAlign={'center'}
              >
                NEW YEAR SALE
              </Text>
            </Box>
              <Image src={swiper3} objectFit={'cover'} height={'712px'} width={'100%'} />
            </SwiperSlide>
            <SwiperSlide display={'relative'}>
            <Box
              position={'absolute'}
              zIndex={'99'}
              left={'0'}
              right={'0'}
              margin={'0 auto'}
              width={{base: '300px', md:'600px'}}
              bottom={{base: '250px', md: '200px'}}
              pointerEvents={'none'}
              border={'5px solid white'}
            >
              <Text
                fontFamily={'Darker Grotesque'}
                fontWeight={'700'}
                fontSize={{ base: '60px', md: '82px', lg: '100px' }}
                color={'white'}
                textAlign={'center'}
              >
                W I N T E R
              </Text>
              <Text
                fontFamily={'Darker Grotesque'}
                fontWeight={'700'}
                fontSize={{ base: '50px', md: '72px', lg: '100px' }}
                color={'white'}
                textAlign={'center'}
              >
                S P E C I A L
              </Text>
            </Box>
              <Image src={swiper4} objectFit={'cover'} height={'712px'} width={'100%'} />
            </SwiperSlide>
            <SwiperSlide display={'relative'}>
            <Box
              position={'absolute'}
              zIndex={'99'}
              left={'0'}
              right={'0'}
              margin={'0 auto'}
              bottom={{base: '200px', md: '150px'}}
              pointerEvents={'none'}
            >
              <Text
                fontFamily={'Darker Grotesque'}
                fontWeight={'700'}
                fontSize={{ base: '50px', md: '72px', lg: '100px' }}
                color={'white'}
                textAlign={'center'}
              >
                K I D S
              </Text>
              <Text
                fontFamily={'Darker Grotesque'}
                fontWeight={'700'}
                fontSize={{ base: '50px', md: '72px', lg: '100px' }}
                color={'white'}
                textAlign={'center'}
              >
                C O L L E C T I O N
              </Text>
            </Box>
              <Image src={swiper5} objectFit={'cover'} height={'712px'} width={'100%'} />
            </SwiperSlide>
          </Swiper>
        </>
    )
}

export default SwiperBox
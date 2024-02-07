import { Box, Flex, Text, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import women from '../../../../assets/images/homepage-images/category-women.jpeg'
import men from '../../../../assets/images/homepage-images/category-men.jpeg'
import kids from '../../../../assets/images/homepage-images/category-kids.jpeg'
import baby from '../../../../assets/images/homepage-images/category-baby.jpeg'

function CategoryList() {
  const navigate = useNavigate()
  return (
    <>
      <Box className="category" margin={'24px auto'} position={'relative'} width={'95%'}>
        <Text fontWeight={'700'} fontSize={'24px'}>
          Category
        </Text>
        <Flex className="category-list" gap={'24px'} marginTop={'14px'} overflowX={'auto'}>
          <Box
            className={'category-women'}
            minWidth={{ base: '136px', md: '330px' }}
            height={{ base: '136px', md: '330px' }}
            bg={'transparent'}
            position={'relative'}
            flexShrink={'0'}
            onClick={() => {
              navigate('/p/women')
            }}
          >
            <Box
              position={'absolute'}
              zIndex={'99'}
              left={'0'}
              right={'0'}
              margin={'0 auto'}
              minWidth={{ base: '136px', md: '330px' }}
              bottom={'25px'}
              pointerEvents={'none'}
            >
              <Text
                fontFamily={'Darker Grotesque'}
                fontWeight={'700'}
                fontSize={{ base: '24px', md: '48px' }}
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
            minWidth={{ base: '136px', md: '330px' }}
            height={{ base: '136px', md: '330px' }}
            bg={'transparent'}
            position={'relative'}
            flexShrink={'0'}
            onClick={() => {
              navigate('/p/men')
            }}
          >
            <Box
              position={'absolute'}
              zIndex={'99'}
              left={'0'}
              right={'0'}
              margin={'0 auto'}
              minWidth={{ base: '136px', md: '330px' }}
              bottom={'25px'}
              pointerEvents={'none'}
            >
              <Text
                fontFamily={'Darker Grotesque'}
                fontWeight={'700'}
                fontSize={{ base: '24px', md: '48px' }}
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
            minWidth={{ base: '136px', md: '330px' }}
            height={{ base: '136px', md: '330px' }}
            bg={'transparent'}
            position={'relative'}
            flexShrink={'0'}
            onClick={() => {
              navigate('/p/kids')
            }}
          >
            <Box
              position={'absolute'}
              zIndex={'99'}
              left={'0'}
              right={'0'}
              margin={'0 auto'}
              minWidth={{ base: '136px', md: '330px' }}
              bottom={'25px'}
              pointerEvents={'none'}
            >
              <Text
                fontFamily={'Darker Grotesque'}
                fontWeight={'700'}
                fontSize={{ base: '24px', md: '48px' }}
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
            minWidth={{ base: '136px', md: '330px' }}
            height={{ base: '136px', md: '330px' }}
            bg={'transparent'}
            position={'relative'}
            flexShrink={'0'}
            onClick={() => {
              navigate('/p/baby')
            }}
          >
            <Box
              position={'absolute'}
              zIndex={'99'}
              left={'0'}
              right={'0'}
              margin={'0 auto'}
              minWidth={{ base: '136px', md: '330px' }}
              bottom={'25px'}
              pointerEvents={'none'}
            >
              <Text
                fontFamily={'Darker Grotesque'}
                fontWeight={'700'}
                fontSize={{ base: '24px', md: '48px' }}
                color={'white'}
                textAlign={'center'}
              >
                B A B Y
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
    </>
  )
}

export default CategoryList

import { Box, Flex, Image, Text } from '@chakra-ui/react'
import newarrival1 from '../../../../assets/images/homepage-images/new-arrival-1.jpg'
import newarrival2 from '../../../../assets/images/homepage-images/new-arrival-2.jpg'
import newarrival3 from '../../../../assets/images/homepage-images/new-arrival-3.jpg'
import { useNavigate } from 'react-router-dom'

function NewArrival() {
  const navigate = useNavigate()
  return (
    <>
      <Flex className="new-arrival" gap={'20px'}>
        <Flex
          width={'50%'}
          position={'relative'}
          cursor={'pointer'}
          onClick={() => {
            navigate('/p/women')
          }}
        >
          <Image
            src={newarrival1}
            objectFit={'cover'}
            borderRadius={'12px'}
            height={'620px'}
            width={'100%'}
            opacity={'1'}
            _hover={{ opacity: '0.75' }}
          />
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
              SUMMER DRESS
            </Text>
          </Box>
        </Flex>
        <Flex gap={'20px'} flexWrap={'wrap'} width={'50%'}>
          <Box
            position={'relative'}
            width={'100%'}
            cursor={'pointer'}
            onClick={() => {
              navigate('/p/men')
            }}
          >
            <Image
              src={newarrival2}
              objectFit={'cover'}
              borderRadius={'12px'}
              height={'300px'}
              width={'100%'}
              opacity={'1'}
              _hover={{ opacity: '0.75' }}
            />
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
                CASUAL CLOTHES
              </Text>
            </Box>
          </Box>

          <Box
            position={'relative'}
            width={'100%'}
            cursor={'pointer'}
            onClick={() => {
              navigate('/p/kids')
            }}
          >
            <Image
              src={newarrival3}
              objectFit={'cover'}
              borderRadius={'12px'}
              height={'300px'}
              width={'100%'}
              opacity={'1'}
              _hover={{ opacity: '0.75' }}
            />
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
                TRENDY SHOES
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default NewArrival

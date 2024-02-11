import {
  AbsoluteCenter,
  Box,
  Flex,
  Image,
  Text,
  
} from '@chakra-ui/react'
import model from '../../assets/images/signup-model.jpeg'
import logo from '../../assets/images/logo.png'
import FormResetPassword from './components/form-reset-password'
function ResetPassword() {
  
  return (
    <>
      <Flex
        height={'100vh'}
        width={'100%'}
        boxShadow={'base'}
        flexDir={{ md: 'row', base: 'column' }}
      >
        <Box
          width={{ base: '100%', md: '50%' }}
          height={{ base: '55%', md: '100vh' }}
          position={'relative'}
        >
          <Image
            borderTopRightRadius={{ md: '20' }}
            borderBottomRightRadius={{ md: '20' }}
            src={model}
            width={'730px'}
            height={'100vh'}
            objectFit={'cover'}
            opacity={'75%'}
          />
          <AbsoluteCenter>
            <Image src={logo} boxSize={{ base: '150px', md: '200px' }} />
          </AbsoluteCenter>
        </Box>
        <Flex
          borderTopRightRadius={{ base: '20', md: '0' }}
          borderTopLeftRadius={{ base: '20', md: '0' }}
          justifyContent={'center'}
          alignItems={{ base: 'flex-start', md: 'center' }}
          alignContent={'center'}
          width={{ md: '50%' }}
          margin={{ md: '50' }}
          padding={{ base: '2em', md: '0' }}
          bg={'white'}
          h={'100%'}
          zIndex={'99'}
        >
          <Box width={'450px'}>
            <Text
              fontWeight={'800'}
              color={'brand.lightred'}
              textAlign={'center'}
              fontSize={{ base: '18px', md: '42px' }}
              marginBottom={'48px'}
              lineHeight={'1.0'}
            >
              CREATE NEW PASSWORD
            </Text>
            
            <FormResetPassword/>
            
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default ResetPassword

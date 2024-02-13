import { AbsoluteCenter, Box, Flex, Image, Text } from '@chakra-ui/react'
import model from '../../assets/images/signup-model.jpeg'
import logo from '../../assets/images/logo.png'
import FormSetPassword from './components/form-password'
function VerifyNewEmail() {
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
          height={{ base: '40%', md: '100vh' }}
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
            <Image src={logo} boxSize={{ base: '150px', md: '200px' }}/>
          </AbsoluteCenter>
        </Box>
        <Flex
          borderTopRightRadius={{ base: '20', md: '0' }}
          borderTopLeftRadius={{ base: '20', md: '0' }}
          justifyContent={'center'}
          alignItems={{ base: 'flex-start', md: 'center' }}
          alignContent={'center'}
          width={{ md: '50%' }}
          padding={{ base: '2em', md: '0' }}
          bg={'white'}
          h={'100%'}
          zIndex={'99'}
        >
          <Box width={{ base: '100%', md: '450px' }}>
            <Text
              fontWeight={'600'}
              color={'brand.lightred'}
              textAlign={'center'}
              fontSize={'28px'}
              marginBottom={'48px'}
              lineHeight={'1.0'}
            >
              Set New Password to Verify Your Email
            </Text>
            <FormSetPassword />
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default VerifyNewEmail

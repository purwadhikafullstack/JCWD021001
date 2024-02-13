import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Text,
  Link,
} from '@chakra-ui/react'
import model from '../../assets/images/signin-model.jpeg'
import { gmail } from '../../assets/Icons/Icons'
import logo from '../../assets/images/logo.png'
import { signInWithGoogle } from '../../firebase'
import FormSignin from './form-signin'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess, setUser } from '../../redux/reducer/authReducer'

function Signin() {
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const location = useLocation()
  const from = location.state?.from || { pathname: '/' };
  const onLoginWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
    
    const userPayload = {
      id: result.data.data.user.id, 
      username: result.data.data.user.username,
      email: result.data.data.user.email,
      roleId: result.data.data.user.roleId,
      isVerified: result.data.data.user.isVerified,
      avatar: result.data.data.user.avatar,
      warehouseId: result.data.data.user.warehouseId,
    };

    dispatch(setUser(userPayload));
    dispatch(loginSuccess());
    navigate(`${from.pathname}${from.search}`, { replace: true });
    } catch (error) {
      console.log(error)
    }
  }

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
          <Box width={{ base: '100%', md: '450px' }}>
            <Text
              fontWeight={'800'}
              color={'brand.lightred'}
              textAlign={'center'}
              fontSize={{ base: '18px', md: '42px' }}
              marginBottom={'40px'}
            >
              SIGN IN
            </Text>
            <FormSignin />
            <Box position="relative" margin={'32px 0'}>
              <Divider border={'1px solid #D9D9D9'} />
              <AbsoluteCenter bg="white" px="4" fontSize={{ md: '20px' }}>
                or
              </AbsoluteCenter>
            </Box>
            <Flex justifyContent={'center'} alignItems={'center'} gap={'24px'}>
              <Button
                width={{ base: '38px', md: '48px' }}
                height={{ base: '38px', md: '48px' }}
                bg={'brand.lightred'}
                padding={{ base: '2px', md: '8px' }}
                borderRadius={{ base: '6px', md: '12px' }}
                onClick={onLoginWithGoogle}
                _hover={{color: '#brand.redhover'}}
              >
                <Icon as={gmail} boxSize={{ base: '30px', md: '38px' }} color={'white'} />
              </Button>
            </Flex>
            <Box mt={'20px'}>
              <Text fontSize={{ md: '20px' }} textAlign={'center'}>
                Don't have account?{' '}
                <Link
                  href={'/signup'}
                  color="#CD0244"
                  _hover={{ color: '#fd1c65' }}
                  fontWeight="700"
                >
                  Signup here
                </Link>
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default Signin

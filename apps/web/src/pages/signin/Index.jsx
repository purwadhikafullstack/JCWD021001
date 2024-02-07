import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Link,
} from '@chakra-ui/react'
import model from '../../assets/images/signup-model.jpeg'
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { gmail } from '../../assets/Icons/Icons'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/reducer/authReducer'
import logo from '../../assets/images/logo.png'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../../firebase'
function Signin({ setOpenTab }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { from } = location.state || { pathname: '/' }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(login(values.email, values.password))
        .then(() => {
          navigate(from.pathname, { replace: true })
        })
        .catch((error) => {
          console.error('Login error:', error)
        })

      resetForm({ values: { email: '', password: '' } })
    },
  })

  const [showPassword, setShowPassword] = useState(false)
  const onLoginWithGoogle = async () => {
    try {
      const result = await signInWithGoogle()
      if (result === 'signin with google success') {
        setOpenTab(3)
      }
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
            <Image src={logo} 
            boxSize={{base: '150px', md: '200px'}} 
            />
          </AbsoluteCenter>
        </Box>
        <Flex
          borderTopRightRadius={{ base: '20', md: '0' }}
          borderTopLeftRadius={{ base: '20', md: '0' }}
          justifyContent={'center'}
          alignItems={{base: 'flex-start', md: 'center'}}
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
              marginBottom={'40px' }
            >
              SIGN IN
            </Text>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <InputGroup marginBottom={'32px'}>
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    _placeholder={{ color: '#707070' }}
                    height={{ base: '48px', md: '64px' }}
                    bg={'#EEEDED'}
                    color={'#707070'}
                    paddingLeft={{ base: '52px', md: '72px' }}
                    fontSize={{ base: '14px', md: '20px' }}
                    borderRadius={{ base: '10px', md: '16px' }}
                  />
                  <InputLeftElement
                    top={{ base: '3px', md: '12px' }}
                    width={{ base: '52px', md: '72px' }}
                  >
                    <Flex justifyContent={'center'} alignItems={'center'} height={'64px'}>
                      <Icon
                        as={EnvelopeIcon}
                        boxSize={{ base: '18px', md: '24px' }}
                        margin={'auto'}
                        position={'relative'}
                        textColor={'brand.grey350'}
                      />
                    </Flex>
                  </InputLeftElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup marginBottom={{base: '8px', md:'15px'}}>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    required
                    placeholder="enter password"
                    _placeholder={{ color: '#707070' }}
                    height={{ base: '48px', md: '64px' }}
                    bg={'#EEEDED'}
                    color={'#707070'}
                    paddingLeft={{ base: '52px', md: '72px' }}
                    fontSize={{ base: '14px', md: '20px' }}
                    borderRadius={{ base: '10px', md: '16px' }}
                  />
                  <InputLeftElement
                    top={{ base: '3px', md: '12px' }}
                    width={{ base: '52px', md: '72px' }}
                  >
                    <Flex justifyContent={'center'} alignItems={'center'} height={'64px'}>
                      <Icon
                        as={LockClosedIcon}
                        boxSize={{ base: '18px', md: '24px' }}
                        margin={'auto'}
                        position={'relative'}
                        textColor={'brand.grey350'}
                      />
                    </Flex>
                  </InputLeftElement>
                  <InputRightElement top={{ base: '3px', md: '12px' }} width={'54px'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}
                      backgroundColor={'transparent'}
                      height={'64px'}
                      _hover={'none'}
                      color={'#707070'}
                    >
                      {showPassword ? (
                        <Icon as={EyeIcon} boxSize={{ base: '18px', md: '24px' }} />
                      ) : (
                        <Icon as={EyeSlashIcon} boxSize={{ base: '18px', md: '24px' }} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Flex justifyContent={'flex-end'} marginBottom={'32px'}>
                <Link
                  href={'/password-reset-request'}
                  color={'#CD0244'}
                  _hover={{ color: '#fd1c65' }}
                  fontSize={{ base: '14px', md: '20px' }}
                >
                  Forgot password?
                </Link>
              </Flex>
              <Button
                width={'100%'}
                height={{base: '48px', md:'68px'}}
                borderRadius={{base: '10px', md:'16px'}}
                fontSize={{base: '18px', md:'24px'}}
                fontWeight={'700'}
                color={'white'}
                bg={'brand.lightred'}
                _hover={{ bg: '#f50f5a' }}
                _active={{ opacity: '70%' }}
                type="submit"
              >
                SIGN IN
              </Button>
            </form>

            <Box position="relative" margin={'32px 0'}>
              <Divider border={'1px solid #D9D9D9'} />
              <AbsoluteCenter bg="white" px="4" fontSize={{md: '20px'}}>
                or
              </AbsoluteCenter>
            </Box>
            <Flex justifyContent={'center'} alignItems={'center'} gap={'24px'}>
              <Button
                width={{base: '38px', md: '48px'}}
                height={{base: '38px', md: '48px'}}
                bg={'brand.lightred'}
                padding={{base: '2px', md:'8px'}}
                borderRadius={{base: '6px', md: '12px'}}
                onClick={onLoginWithGoogle}
                _hover={'#brand.redhover'}
              >
                <Icon as={gmail} boxSize={{base: '30px', md:'38px'}} color={'white'} />
              </Button>
            </Flex>

            <Box mt={'20px'}>
              <Text fontSize={{md: '20px'}} textAlign={'center'}>
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
